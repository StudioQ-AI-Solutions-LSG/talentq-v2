import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requisitionsService } from '../services/requitisions-service';
import type {
    Requisition,
    RequisitionFilters,
    CreateRequisitionRequest,
    UpdateRequisitionRequest
} from '../types/requisitions.types';

// Main hook return type
interface UseRequisitionsReturn {
    // Data
    requisitions: Requisition[];
    total: number;
    totalPages: number;
    currentPage: number;
    stats: any; // TODO: Type when RequisitionStats is defined

    // Loading states
    isLoading: boolean;
    statsLoading: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isUpdatingStatus: boolean;

    // Error states
    error: Error | null;
    createError: Error | null;
    updateError: Error | null;
    deleteError: Error | null;
    statusUpdateError: Error | null;

    // Actions
    refetch: () => void;
    createRequisition: (data: CreateRequisitionRequest) => void;
    updateRequisition: (params: { id: string; data: UpdateRequisitionRequest }) => void;
    deleteRequisition: (id: string) => void;
    updateStatus: (params: { id: string; status: string }) => void;

    // Mutations for direct access if needed
    createRequisitionMutation: any;
    updateRequisitionMutation: any;
    deleteRequisitionMutation: any;
    updateStatusMutation: any;
}

/**
 * Main hook for managing requisitions with React Query
 * @param filters - Optional filters for requisitions
 * @param page - Current page number (default: 1)
 * @param limit - Limit of items per page (default: 8)
 * @returns Object with data, loading states, errors and actions
 */
export const useRequisitions = (
    filters?: RequisitionFilters,
    page: number = 1,
    limit: number = 8
): UseRequisitionsReturn => {
    const queryClient = useQueryClient();

    // Query to get requisitions with filters and pagination
    const {
        data: requisitionsData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['requisitions', filters, page, limit],
        queryFn: () => requisitionsService.getRequisitions(filters, page, limit),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData // Keep previous data while loading new ones
    });

    // Query for requisition statistics
    const {
        data: stats,
        isLoading: statsLoading
    } = useQuery({
        queryKey: ['requisitions-stats'],
        queryFn: () => requisitionsService.getRequisitionStats(),
        staleTime: 10 * 60 * 1000 // 10 minutes
    });

    // Mutation for creating requisitions
    const createRequisitionMutation = useMutation({
        mutationFn: (data: CreateRequisitionRequest) => requisitionsService.createRequisition(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requisitions'] });
            queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
        }
    });

    // Mutation for updating requisitions
    const updateRequisitionMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateRequisitionRequest }) =>
            requisitionsService.updateRequisition(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requisitions'] });
            queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
        }
    });

    // Mutation for deleting requisitions
    const deleteRequisitionMutation = useMutation({
        mutationFn: (id: string) => requisitionsService.deleteRequisition(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requisitions'] });
            queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
        }
    });

    // Mutation for updating status
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            requisitionsService.updateRequisitionStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requisitions'] });
            queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
        }
    });



    return {
        // Data
        requisitions: requisitionsData?.requisitions || [],
        total: requisitionsData?.total || 0,
        totalPages: requisitionsData?.total_pages || 1,
        currentPage: page,
        stats,

        // Loading states
        isLoading,
        statsLoading,
        isCreating: createRequisitionMutation.isPending,
        isUpdating: updateRequisitionMutation.isPending,
        isDeleting: deleteRequisitionMutation.isPending,
        isUpdatingStatus: updateStatusMutation.isPending,

        // Error states
        error,
        createError: createRequisitionMutation.error,
        updateError: updateRequisitionMutation.error,
        deleteError: deleteRequisitionMutation.error,
        statusUpdateError: updateStatusMutation.error,

        // Actions
        refetch,
        createRequisition: createRequisitionMutation.mutate,
        updateRequisition: updateRequisitionMutation.mutate,
        deleteRequisition: deleteRequisitionMutation.mutate,
        updateStatus: updateStatusMutation.mutate,

        // Mutations for direct access if needed
        createRequisitionMutation,
        updateRequisitionMutation,
        deleteRequisitionMutation,
        updateStatusMutation
    };
};

// Individual hook return type
interface UseRequisitionReturn {
    requisition: any; // TODO: Type when Requisition is defined
    isLoading: boolean;
    error: Error | null;
    updateRequisition: (data: UpdateRequisitionRequest) => void;
    isUpdating: boolean;
    updateError: Error | null;
}

/**
 * Hook for managing an individual requisition
 * @param id - Requisition ID
 * @returns Object with data, loading states, errors and actions for a requisition
 */
export const useRequisition = (id: string): UseRequisitionReturn => {
    const queryClient = useQueryClient();

    const {
        data: requisition,
        isLoading,
        error
    } = useQuery({
        queryKey: ['requisition', id],
        queryFn: () => requisitionsService.getRequisition(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000 // 5 minutes
    });

    const updateRequisitionMutation = useMutation({
        mutationFn: (data: UpdateRequisitionRequest) => requisitionsService.updateRequisition(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requisition', id] });
            queryClient.invalidateQueries({ queryKey: ['requisitions'] });
            queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
        }
    });

    return {
        requisition,
        isLoading,
        error,
        updateRequisition: updateRequisitionMutation.mutate,
        isUpdating: updateRequisitionMutation.isPending,
        updateError: updateRequisitionMutation.error
    };
};