import { useQuery } from "@tanstack/react-query";
import { requisitionsPositionsCandidatesService } from "../../services/requisitions-positions-candidates";
import { RequisitionPositionCandidatesParams } from "../../services/requisitions-positions-candidates";

export const useRequisitionCandidatesDetails = (
  positionId: string, 
  additionalParams?: Partial<RequisitionPositionCandidatesParams>
) => {
  // Parámetros por defecto SIN filtros globales
  const defaultParams = {
    page: 1,
    page_size: 8,
    status: '',
    customer_like: '',
    ...additionalParams
  };
  
  const params: RequisitionPositionCandidatesParams = {
    positionId,
    // NO incluir selected_customer ni selected_division
    ...defaultParams
  };
  
  return useQuery({
    queryKey: [
      "requisition-candidates-details", 
      positionId, 
      defaultParams.page,
      defaultParams.page_size,
      defaultParams.status,
      defaultParams.customer_like
    ],
    queryFn: () => requisitionsPositionsCandidatesService.getCandidatesByPositionId(params),
    enabled: !!positionId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};