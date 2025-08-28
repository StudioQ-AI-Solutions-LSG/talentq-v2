import { http, httpV2 } from "@/lib/api/axios";
import type {
    Requisition,
    RequisitionListResponse,
    RequisitionListResponseLegacy,
    CreateRequisitionRequest,
    UpdateRequisitionRequest,
    RequisitionFilters,
    RequisitionStats
} from "../types/requisitions.types";

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

export const requisitionsService = {
    /**
     * Gets the list of requisitions with filters and pagination
     * @returns Promise<RequisitionListResponseLegacy> - Paginated list of requisitions
     */
    getRequisitions: async (filters?: RequisitionFilters, page: number = 1, limit: number = 8): Promise<RequisitionListResponseLegacy> => {
        try {
            const params = new URLSearchParams();

            // Required backend parameters
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
    getRequisition: async (id: string): Promise<Requisition> => {
        try {
            const response = await http.get<Requisition>(`/requisition/positions/${id}`);
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
            const response = await http.post<Requisition>('/requisition/positions', data);
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