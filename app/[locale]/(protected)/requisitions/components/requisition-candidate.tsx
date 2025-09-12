import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRequisitionCandidates } from "../hooks/useRequisitionsPositionsCandidates";
import { RequisitionPositionCandidate, CandidateSkill } from "../services/requisitions-positions-candidates";
interface RequisitionCandidatesProps {
    positionId: string;
    maxVisible?: number; // Máximo de avatares a mostrar
}

export const RequisitionCandidates = ({ positionId, maxVisible = 3 }: RequisitionCandidatesProps) => {
    const { data, isLoading, error } = useRequisitionCandidates(positionId);

    if (isLoading) return <div>Loading candidates...</div>;
    if (error) return <div>Error loading candidates</div>;
    if (!data?.items || data.items.length === 0) {
        return null;
    }

    const visibleCandidates = data.items.slice(0, maxVisible);
    const remainingCount = data.items.length - maxVisible;

    return (
        <div className="flex items-center -space-x-1">
            {visibleCandidates.map((candidate: RequisitionPositionCandidate, index: number) => {
                return (
                    <Avatar
                        key={candidate.id}
                        className="h-6 w-6 shadow-none border-none bg-transparent hover:bg-transparent"
                    >
                        <AvatarImage src={candidate.photo || `/images/avatar/av-${index + 1}.svg`} />
                        <AvatarFallback className="text-xs">
                            {candidate.name ? candidate.name.charAt(0) + candidate.name.charAt(1) : '??'}
                        </AvatarFallback>
                    </Avatar>
                );
            })}
            {remainingCount > 0 && (
                <div className="bg-card text-default-900 text-xs ring-2 ring-default-100 rounded-full h-6 w-6 flex flex-col justify-center items-center">
                    +{remainingCount}
                </div>
            )}
        </div>
    );
};