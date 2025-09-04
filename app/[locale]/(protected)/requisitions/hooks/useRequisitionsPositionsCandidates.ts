import { useQuery } from "@tanstack/react-query";
import { requisitionsPositionsCandidatesService } from "../services/requisitions-positions-candidates";

export const useRequisitionCandidates = (positionId: string) => {
    return useQuery({
        queryKey: ["requisition-candidates", positionId],
        queryFn: () => requisitionsPositionsCandidatesService.getCandidatesByPositionId(positionId),
        enabled: !!positionId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};