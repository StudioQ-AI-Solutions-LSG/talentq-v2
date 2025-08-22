export interface CandidateResponse {
  data: Candidate[];
  error?: string;
}

export interface CandidateListParams {
  selected_division: string;
  selected_customer: string;
  selected_customer_name?: string;
  requisition_position_id: string | null;
  status: string;
  search_criteria: string;
  page: number;
  page_size: number;
}

export interface AiObject {
  title: string;
  included: boolean;
  speciality: string;
  description: string;
}

export interface Skills {
  name: string;
  type: string;
  id: string;
  candidate_skill_id: string;
}

export interface Candidate {
  id: string;
  name: string;
  birth_date: string;
  last_name: string;
  photo: string;
  location: string;
  resume: string;
  ai_object: AiObject;
  is_available_for_interview: boolean;
  seniority_name: string;
  default_languagedefault_language: string;
  role: string;
  assignment_status: string;
  match: number;
  is_customer_likes: boolean;
  customer_wants_to_interview: boolean;
  expected_interview_date: string;
  confirmed_interview_date: string;
  interview_duration_in_minutes: number;
  rate: number;
  rate_type: string;
  candidate_assignment: string;
  attachment_cv: string;
  attachment_english_video: string;
  requisition_position_id: string;
  skills: Skills[];
  requisition_name: string;
}
