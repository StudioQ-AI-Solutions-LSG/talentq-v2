import { useQuery } from "@tanstack/react-query";
import { requisitionsPositionsCandidatesService } from "../services/requisitions-positions-candidates";
import { RequisitionPositionCandidatesParams } from "../services/requisitions-positions-candidates";
import { useCandidatesStore } from "@/store/candidate.store";

export const useRequisitionCandidates = (positionId: string, additionalParams?: Partial<RequisitionPositionCandidatesParams>) => {
    const { selected_customer, selected_division } = useCandidatesStore();
    
    // Parámetros por defecto
    const defaultParams = {
        page: 1,
        page_size: 8,
        status: '',
        customer_like: '',
        ...additionalParams
    };
    
    // Combinar parámetros
    const params: RequisitionPositionCandidatesParams = {
        positionId,
        selected_customer,
        selected_division,
        ...defaultParams
    };
    
    return useQuery({
        queryKey: [
            "requisition-candidates", 
            positionId, 
            selected_customer, 
            selected_division,
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