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

export interface RequisitionPositionCandidatesParams {
    page?: number;
    page_size?: number;
    status?: string;
    customer_like?: string;
    positionId: string;
    selected_customer?: string;
    selected_division?: string;
}

export const requisitionsPositionsCandidatesService = {
    getCandidatesByPositionId: async (params: RequisitionPositionCandidatesParams): Promise<RequisitionPositionCandidatesResponse> => {
        try {
            const { positionId, ...queryParams } = params;

            const searchParams = new URLSearchParams();

            searchParams.append('id', positionId);

            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '' && value !== 'all') {
                    searchParams.append(key, String(value));
                }
            });

            const queryString = searchParams.toString();
            const url = `/requisition/position/${positionId}/candidates?${queryString}`;

            const response = await httpV2.get<RequisitionPositionCandidatesResponse>(url);
            if (response.itemsTotal > 0) console.log("✅ CANDIDATES RESPONSE: \n", response);
            return response;
        } catch (error: any) {
            console.error('❌ Error fetching candidates for position:', params.positionId);
            console.error('❌ Error details:', error);
            console.error('❌ Error response data:', error.response?.data);
            console.error('❌ Error response status:', error.response?.status);
            console.error('❌ Error response headers:', error.response?.headers);
            throw error;
        }
    }
};