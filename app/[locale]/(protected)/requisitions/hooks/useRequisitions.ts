import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requisitionsService } from '../services/requisitions.service';
import type { 
  Requisition, 
  RequisitionFilters, 
  CreateRequisitionRequest, 
  UpdateRequisitionRequest 
} from '../types/requisitions.types';

// Tipo de retorno del hook principal
interface UseRequisitionsReturn {
  // Datos
  requisitions: Requisition[];
  total: number;
  totalPages: number;
  currentPage: number;
  stats: any; // TODO: Tipificar cuando se defina RequisitionStats
  
  // Estados de carga
  isLoading: boolean;
  statsLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isUpdatingStatus: boolean;
  
  // Estados de error
  error: Error | null;
  createError: Error | null;
  updateError: Error | null;
  deleteError: Error | null;
  statusUpdateError: Error | null;
  
  // Acciones
  refetch: () => void;
  createRequisition: (data: CreateRequisitionRequest) => void;
  updateRequisition: (params: { id: string; data: UpdateRequisitionRequest }) => void;
  deleteRequisition: (id: string) => void;
  updateStatus: (params: { id: string; status: string }) => void;
  
  // Mutations para acceso directo si es necesario
  createRequisitionMutation: any;
  updateRequisitionMutation: any;
  deleteRequisitionMutation: any;
  updateStatusMutation: any;
}

/**
 * Hook principal para gestionar requisitions con React Query
 * @param filters - Filtros opcionales para las requisitions
 * @param page - Número de página actual (por defecto: 1)
 * @param limit - Límite de elementos por página (por defecto: 8)
 * @returns Objeto con datos, estados de carga, errores y acciones
 */
export const useRequisitions = (
  filters?: RequisitionFilters, 
  page: number = 1, 
  limit: number = 8
): UseRequisitionsReturn => {
  const queryClient = useQueryClient();

  // Debug: Log de filtros recibidos en el hook
  console.log('🔍 Hook - Filters received:', filters);
  console.log('🔍 Hook - Page:', page, 'Limit:', limit);

  // Query para obtener requisitions con filtros y paginación
  const {
    data: requisitionsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['requisitions', filters, page, limit],
    queryFn: () => requisitionsService.getRequisitions(filters, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutos
    placeholderData: (previousData) => previousData // Mantener datos anteriores mientras se cargan nuevos
  });

  // Query para estadísticas de requisitions
  const {
    data: stats,
    isLoading: statsLoading
  } = useQuery({
    queryKey: ['requisitions-stats'],
    queryFn: () => requisitionsService.getRequisitionStats(),
    staleTime: 10 * 60 * 1000 // 10 minutos
  });

  // Mutation para crear requisitions
  const createRequisitionMutation = useMutation({
    mutationFn: (data: CreateRequisitionRequest) => requisitionsService.createRequisition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requisitions'] });
      queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
    }
  });

  // Mutation para actualizar requisitions
  const updateRequisitionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRequisitionRequest }) => 
      requisitionsService.updateRequisition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requisitions'] });
      queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
    }
  });

  // Mutation para eliminar requisitions
  const deleteRequisitionMutation = useMutation({
    mutationFn: (id: string) => requisitionsService.deleteRequisition(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requisitions'] });
      queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
    }
  });

  // Mutation para actualizar estado
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      requisitionsService.updateRequisitionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requisitions'] });
      queryClient.invalidateQueries({ queryKey: ['requisitions-stats'] });
    }
  });



  return {
    // Datos
    requisitions: requisitionsData?.requisitions || [],
    total: requisitionsData?.total || 0,
    totalPages: requisitionsData?.total_pages || 1,
    currentPage: page,
    stats,
    
    // Estados de carga
    isLoading,
    statsLoading,
    isCreating: createRequisitionMutation.isPending,
    isUpdating: updateRequisitionMutation.isPending,
    isDeleting: deleteRequisitionMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
    
    // Estados de error
    error,
    createError: createRequisitionMutation.error,
    updateError: updateRequisitionMutation.error,
    deleteError: deleteRequisitionMutation.error,
    statusUpdateError: updateStatusMutation.error,
    
    // Acciones
    refetch,
    createRequisition: createRequisitionMutation.mutate,
    updateRequisition: updateRequisitionMutation.mutate,
    deleteRequisition: deleteRequisitionMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    
    // Mutations para acceso directo si es necesario
    createRequisitionMutation,
    updateRequisitionMutation,
    deleteRequisitionMutation,
    updateStatusMutation
  };
};

// Tipo de retorno del hook individual
interface UseRequisitionReturn {
  requisition: any; // TODO: Tipificar cuando se defina Requisition
  isLoading: boolean;
  error: Error | null;
  updateRequisition: (data: UpdateRequisitionRequest) => void;
  isUpdating: boolean;
  updateError: Error | null;
}

/**
 * Hook para gestionar una requisition individual
 * @param id - ID de la requisition
 * @returns Objeto con datos, estados de carga, errores y acciones para una requisition
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
    staleTime: 5 * 60 * 1000 // 5 minutos
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
