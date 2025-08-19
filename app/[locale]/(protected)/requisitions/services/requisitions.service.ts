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

// Función helper para convertir la respuesta del backend al formato del frontend
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
    // ========================================
    // OPERACIONES CRUD - Devuelven JSON
    // ========================================

    /**
     * Obtiene la lista de requisitions con filtros y paginación
     * @returns Promise<RequisitionListResponseLegacy> - Lista paginada de requisitions
     */
    getRequisitions: async (filters?: RequisitionFilters, page: number = 1, limit: number = 8): Promise<RequisitionListResponseLegacy> => {
        try {
            const params = new URLSearchParams();

            // Parámetros requeridos por el backend
            params.append('page', page.toString());
            params.append('page_size', limit.toString());

            // Parámetros opcionales
            if (filters?.search_criteria) params.append('search_criteria', filters.search_criteria);
            if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
            if (filters?.skills && filters.skills.length > 0) params.append('skills', filters.skills.join(','));
            if (filters?.seniority_id && filters.seniority_id !== 'all') params.append('seniority_id', filters.seniority_id);
            if (filters?.position_id && filters.position_id !== 'all') params.append('position_id', filters.position_id);
            if (filters?.customer_id && filters.customer_id !== 'all') {
                params.append('selected_customer', filters.customer_id);
                console.log('👤 Adding customer filter:', filters.customer_id);
            } else {
                console.log('🌍 No customer filter (All Accounts)');
            }
            if (filters?.division_id && filters.division_id !== 'all') params.append('selected_division', filters.division_id);

            // Lógica de filtros por defecto - SOLO aplicar status=Active si hay customer específico
            // y NO hay status explícito seleccionado
            //   if (filters?.customer_id && 
            //       filters.customer_id !== 'all' && 
            //       filters.customer_id !== '' && 
            //       filters.customer_id !== undefined &&
            //       (!filters?.status || filters.status === 'all')) {
            //     params.append('status', 'Active');
            //     console.log('🔒 Applying default status filter: Active (customer specific)');
            //   } else {
            //     console.log('🌍 No default status filter applied');
            //   }

            console.log('🔍 Calling API with params:', params.toString());
            console.log('📊 Filters received:', JSON.stringify(filters, null, 2));
            console.log('🎯 Final URL:', `/requisition/positions?${params.toString()}`);

            // Llamada HTTP que devuelve JSON
            const response = await httpV2.get<RequisitionListResponse>(`/requisition/positions?${params.toString()}`);

            console.log('✅ API Response:', response);

            // Convertir la respuesta del backend al formato del frontend
            return mapBackendResponseToFrontend(response, page, limit);
        } catch (error) {
            console.error('❌ Error fetching requisitions:', error);
            throw error;
        }
    },

    /**
     * Obtiene una requisition individual por ID
     * @returns Promise<Requisition> - Datos de la requisition
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
     * Crea una nueva requisition
     * @returns Promise<Requisition> - Requisition creada
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
     * Actualiza una requisition existente
     * @returns Promise<Requisition> - Requisition actualizada
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
     * Elimina una requisition
     * @returns Promise<void> - Sin retorno
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
     * Obtiene estadísticas de requisitions
     * @returns Promise<RequisitionStats> - Estadísticas en formato JSON
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
     * Actualiza el estado de una requisition
     * @returns Promise<Requisition> - Requisition con estado actualizado
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
