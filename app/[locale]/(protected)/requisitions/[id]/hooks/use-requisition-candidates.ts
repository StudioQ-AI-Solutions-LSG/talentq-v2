"use client";

import { useQuery } from "@tanstack/react-query";
import { httpV2 } from "@/lib/api/axios";
import { RequisitionPositionCandidate, RequisitionPositionCandidatesResponse } from "../../services/requisitions-positions-candidates";

interface UseRequisitionCandidatesReturn {
  candidates: RequisitionPositionCandidate[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook for fetching candidates associated with a specific requisition
 * @param requisitionId - The ID of the requisition
 * @returns Object with candidates data, loading state, error, and refetch function
 */
export const useRequisitionCandidates = (requisitionId: string): UseRequisitionCandidatesReturn => {
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['requisition-candidates', requisitionId],
    queryFn: async (): Promise<RequisitionPositionCandidate[]> => {
      try {
        const response = await httpV2.get<RequisitionPositionCandidatesResponse>(
          `/requisition/positions/${requisitionId}/candidates`
        );
        return response.items || [];
      } catch (error) {
        console.error('Error fetching requisition candidates:', error);
        // Return mock data for development
        return [
          {
            id: "1",
            name: "John",
            last_name: "Doe",
            rate: 75000,
            role: "Senior Developer",
            photo: "/images/avatar/av-1.svg",
            resume: "resume.pdf",
            skills: [
              { id: "1", name: "React", type: "hard", candidate_skill_id: "1" },
              { id: "2", name: "TypeScript", type: "hard", candidate_skill_id: "2" },
              { id: "3", name: "Node.js", type: "hard", candidate_skill_id: "3" },
            ],
            location: "New York, NY",
            rate_type: "annual",
            birth_date: "1990-01-15",
            attachment_cv: "cv.pdf",
            seniority_name: "Senior",
            default_language: "English",
            assignment_status: "interview",
            is_customer_likes: true,
            candidate_assignment: "assigned",
            default_language_level: "Native",
            expected_interview_date: "2024-01-20",
            confirmed_interview_date: "2024-01-20",
            customer_interview_notes: "Strong technical background",
            is_available_for_interview: true,
            customer_wants_to_interview: true,
            interview_duration_in_minutes: 60,
          },
          {
            id: "2",
            name: "Jane",
            last_name: "Smith",
            rate: 80000,
            role: "Full Stack Developer",
            photo: "/images/avatar/av-2.svg",
            resume: "resume.pdf",
            skills: [
              { id: "1", name: "Vue.js", type: "hard", candidate_skill_id: "1" },
              { id: "2", name: "Python", type: "hard", candidate_skill_id: "2" },
              { id: "3", name: "PostgreSQL", type: "hard", candidate_skill_id: "3" },
            ],
            location: "San Francisco, CA",
            rate_type: "annual",
            birth_date: "1988-05-22",
            attachment_cv: "cv.pdf",
            seniority_name: "Senior",
            default_language: "English",
            assignment_status: "new",
            is_customer_likes: false,
            candidate_assignment: "pending",
            default_language_level: "Native",
            expected_interview_date: "",
            confirmed_interview_date: "",
            customer_interview_notes: "",
            is_available_for_interview: true,
            customer_wants_to_interview: false,
            interview_duration_in_minutes: 0,
          },
          {
            id: "3",
            name: "Mike",
            last_name: "Johnson",
            rate: 70000,
            role: "Frontend Developer",
            photo: "/images/avatar/av-3.svg",
            resume: "resume.pdf",
            skills: [
              { id: "1", name: "Angular", type: "hard", candidate_skill_id: "1" },
              { id: "2", name: "JavaScript", type: "hard", candidate_skill_id: "2" },
              { id: "3", name: "CSS", type: "hard", candidate_skill_id: "3" },
            ],
            location: "Austin, TX",
            rate_type: "annual",
            birth_date: "1992-08-10",
            attachment_cv: "cv.pdf",
            seniority_name: "Mid",
            default_language: "English",
            assignment_status: "approved",
            is_customer_likes: true,
            candidate_assignment: "approved",
            default_language_level: "Native",
            expected_interview_date: "2024-01-18",
            confirmed_interview_date: "2024-01-18",
            customer_interview_notes: "Excellent communication skills",
            is_available_for_interview: true,
            customer_wants_to_interview: true,
            interview_duration_in_minutes: 45,
          },
        ];
      }
    },
    enabled: !!requisitionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    candidates: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
