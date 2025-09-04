import { httpV2 } from "@/lib/api/axios";

export interface RequisitionPositionCandidate {
    id: string;
    name: string;
    rate: number;
    role: string;
    photo: string;
    resume: string;
    skills: string[];
    location: string;
    last_name: string;
    rate_type: 'annual' | 'monthly';
    birth_date: string;
    attachment_cv: string;
    seniority_name: string;
    default_language: string;
    assignment_status: string;
    is_customer_likes: boolean;
    candidate_assignment: string;
    default_language_level: string;
    expected_interview_date: string;
    confirmed_interview_date: string;
    customer_interview_notes: string;
    is_available_for_interview: boolean;
    customer_wants_to_interview: boolean;
    interview_duration_in_minutes: number;
}

export interface RequisitionPositionCandidatesResponse {
    items: RequisitionPositionCandidate[];
    itemsTotal: number;
}

export const requisitionsPositionsCandidatesService = {

    getCandidatesByPositionId: async (positionId: string): Promise<RequisitionPositionCandidatesResponse> => {
        try {
            const response = await httpV2.get<RequisitionPositionCandidatesResponse>(
                `/requisition/position/${positionId}/candidates`
            );
            // console.log("CANDIDATES: \n", response);
            return response;
        } catch (error) {
            console.error('Error fetching candidates for position:', error);
            throw error;
        }
    }
};