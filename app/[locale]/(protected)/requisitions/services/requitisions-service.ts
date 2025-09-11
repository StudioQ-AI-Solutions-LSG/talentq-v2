import { http, httpV2 } from "@/lib/api/axios";
import type {
    Requisition,
    RequisitionListResponse,
    RequisitionListResponseLegacy,
    CreateRequisitionRequest,
    UpdateRequisitionRequest,
    RequisitionFilters,
    RequisitionStats,
    AvailabilityOption
} from "../types/requisitions.types";

interface RequisitionDetailsParams {
    id: string;
    selected_customer?: string;
    selected_division?: string;
}

// Helper function to convert backend response to frontend format
const mapBackendResponseToFrontend = (backendResponse: RequisitionListResponse, page: number, pageSize: number): RequisitionListResponseLegacy => {
    const total = backendResponse.itemsTotal;
    const totalPages = Math.ceil(total / pageSize);

    return {
        requisitions: backendResponse.items,
        total,
        page,
        limit: pageSize,
        total_pages: totalPages,
        page_size: pageSize,
        total_count: total
    };
};

// Helper function to map backend availabilities to frontend format
const mapBackendAvailabilities = (backendAvailabilities: any[]): AvailabilityOption[] => {
    if (!backendAvailabilities || !Array.isArray(backendAvailabilities)) {
        return [];
    }

    // Función para categorizar availability basado en su valor
    const categorizeAvailability = (value: string): 'location' | 'schedule' | 'team_size' => {
        const locationValues = ['on-site', 'on site', 'hybrid', 'remote'];
        const scheduleValues = ['full', 'rg', 'afhr', 'full - bd', 'rgwk', 'ovn', 'test', 'regular', 'regular/full', 'full-business days', 'after hours', 'any', 'regular weekend'];
        
        const normalizedValue = value.toLowerCase().trim();
        
        if (locationValues.includes(normalizedValue)) {
            return 'location';
        } else if (scheduleValues.includes(normalizedValue)) {
            return 'schedule';
        } else {
            // Por defecto, asumir que es team_size si no coincide con los otros
            return 'team_size';
        }
    };

    // Función para obtener el color basado en el tipo
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'location':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'schedule':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'team_size':
                return 'bg-pink-100 text-pink-800 border-pink-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Función para formatear el label usando los full_name del backend
    const formatLabel = (value: string): string => {
        const labelMap: Record<string, string> = {
            'on-site': 'On Site',
            'on site': 'On Site',
            'hybrid': 'Hybrid',
            'remote': 'Remote',
            'full': 'Full / Complete',
            'rg': 'Regular Hours',
            'afhr': 'After Hours',
            'full - bd': 'Business Days',
            'rgwk': 'Weekends',
            'ovn': 'Overnight',
            'test': 'Test',
            'regular': 'Regular',
            'regular/full': 'Regular/Full',
            'full-business days': 'Full-Business Days',
            'after hours': 'After Hours',
            'any': 'Any',
            'regular weekend': 'Regular Weekend'
        };

        const normalizedValue = value.toLowerCase().trim();
        return labelMap[normalizedValue] || value;
    };

    return backendAvailabilities.map((item, index) => {
        const rawValue = item.value || item.label || item.name || item.title || 'Unknown';
        const normalizedValue = rawValue.toLowerCase().trim();
        const category = categorizeAvailability(normalizedValue);
        
        return {
            id: item.id || `avail-${index}`,
            type: category,
            label: formatLabel(rawValue),
            value: normalizedValue,
            color: getTypeColor(category)
        };
    });
};

export const requisitionsService = {
    /**
     * Gets the list of requisitions with filters and pagination
     * @returns Promise<RequisitionListResponseLegacy> - Paginated list of requisitions
     */
    getRequisitions: async (filters?: RequisitionFilters, page: number = 1, limit: number = 8): Promise<RequisitionListResponseLegacy> => {
        try {
            const params = new URLSearchParams();

            // Required backend parameters - CORREGIDO: estos parámetros deben ir siempre
            params.append('page', page.toString());
            params.append('page_size', limit.toString());

            // Optional parameters
            if (filters?.search_criteria) params.append('search_criteria', filters.search_criteria);
            if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
            if (filters?.skills && filters.skills.length > 0) params.append('skills', filters.skills.join(','));
            if (filters?.seniority_id && filters.seniority_id !== 'all') params.append('seniority_id', filters.seniority_id);
            if (filters?.position_id && filters.position_id !== 'all') params.append('position_id', filters.position_id);
            if (filters?.customer_id && filters.customer_id !== 'all' && filters.customer_id !== null) {
                params.append('selected_customer', filters.customer_id);
            }
            if (filters?.division_id && filters.division_id !== 'all' && filters.division_id !== null) {
                params.append('selected_division', filters.division_id);
            }

            console.log('URL request:', `/requisition/positions?${params.toString()}`);
            console.log('Page:', page, 'Limit:', limit);

            // HTTP call that returns JSON
            const response = await httpV2.get<RequisitionListResponse>(`/requisition/positions?${params.toString()}`);

            console.log('API Response:', response);

            // Convert backend response to frontend format
            return mapBackendResponseToFrontend(response, page, limit);
        } catch (error) {
            console.error('Error fetching requisitions:', error);
            throw error;
        }
    },

    /**
     * Gets an individual requisition by ID
     * @returns Promise<Requisition> - Requisition data
     */
    getRequisition: async (params: RequisitionDetailsParams): Promise<Requisition> => {
        const { id, selected_customer, selected_division } = params;
        console.log('getRequisition - ID:', id);
        let url = `/requisition/position/${id}`;
        const queryParams = new URLSearchParams();
        if (selected_customer) queryParams.append('selected_customer', selected_customer);
        if (selected_division) queryParams.append('selected_division', selected_division);
        if (queryParams.toString()) url += `?${queryParams.toString()}`;
        try {
            const response = await httpV2.get<Requisition>(url);
            console.log('getRequisition - RESPONSE:', response);
            
            // Mapear availabilities si existen
            if (response.availabilities) {
                response.availabilities = mapBackendAvailabilities(response.availabilities);
            }
            
            return response;
        } catch (error) {
            console.error('Error fetching requisition:', error);
            throw error;
        }
    },

    /**
     * Creates a new requisition
     * @returns Promise<Requisition> - Created requisition
     */
    createRequisition: async (data: CreateRequisitionRequest): Promise<Requisition> => {
        try {
            const response = await httpV2.post<Requisition>('/requisition/positions', data);
            return response;
        } catch (error) {
            console.error('Error creating requisition:', error);
            throw error;
        }
    },

    /**
     * Updates an existing requisition
     * @returns Promise<Requisition> - Updated requisition
     */
    updateRequisition: async (id: string, data: UpdateRequisitionRequest): Promise<Requisition> => {
        try {
            const response = await http.put<Requisition>(`/requisition/positions/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error updating requisition:', error);
            throw error;
        }
    },

    /**
     * Deletes a requisition
     * @returns Promise<void> - No return
     */
    deleteRequisition: async (id: string): Promise<void> => {
        try {
            await http.delete(`/requisition/positions/${id}`);
        } catch (error) {
            console.error('Error deleting requisition:', error);
            throw error;
        }
    },

    /**
     * Gets requisition statistics
     * @returns Promise<RequisitionStats> - Statistics in JSON format
     */
    getRequisitionStats: async (): Promise<RequisitionStats> => {
        try {
            const response = await http.get<RequisitionStats>('/requisition/positions/stats');
            return response;
        } catch (error) {
            console.error('Error fetching requisition stats:', error);
            throw error;
        }
    },

    /**
     * Updates the status of a requisition
     * @returns Promise<Requisition> - Requisition with updated status
     */
    updateRequisitionStatus: async (id: string, status: string): Promise<Requisition> => {
        try {
            const response = await http.patch<Requisition>(`/requisition/positions/${id}/status`, { status });
            return response;
        } catch (error) {
            console.error('Error updating requisition status:', error);
            throw error;
        }
    },
};