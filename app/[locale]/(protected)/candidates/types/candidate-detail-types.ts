export interface CandidateDetailParams {
  id: string;
  selected_division: string;
  selected_customer: string;
}

export interface Skill {
  name: string;
  type: string;
  id: string;
  candidate_skill_id: string;
}

export interface Education {
  id: string;
  school: string;
  title: string;
  title_type: string;
  start_date: string;
  end_date: string;
  document_support: string;
}

export interface Experience {
  id: string;
  employment_type: string;
  title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  description: string;
  document_support: string;
}

export interface Position {
  name: string;
}

export interface Seniority {
  name: string;
}

export interface CandidateAssignment {
  position: Position;
  seniority: Seniority;
  skills_id: string[];
  candidate_cv: string;
  candidate_id: string;
  candidate_video: string;
}

export interface AdditionalExpectedInterviewDate {
  expected_interview_date: number;
  interview_duration_in_minutes: number;
}

export interface CandidateDetail {
  id: string;
  name: string;
  birth_date: string;
  last_name: string;
  photo: string;
  location: string;
  resume: string;
  ai_object: string;
  is_available_for_interview: boolean;
  seniority_name: string;
  default_language: string;
  default_language_level: string;
  role: string;
  organization_division_id: string;
  assignment_status: string;
  match: string;
  is_customer_likes: boolean;
  customer_wants_to_interview: boolean;
  expected_interview_date: number;
  confirmed_interview_date: number | null;
  interview_duration_in_minutes: number;
  customer_interview_notes: string;
  additional_expected_interview_date: AdditionalExpectedInterviewDate[];
  rate: string;
  rate_type: string;
  attachment_cv: string | null;
  attachment_english_video: string;
  candidate_assignment: CandidateAssignment;
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  social_profiles: any[];
}

export interface SkillSectionProps {
  id: string;
  name: string;
  level: number; // 1-100
  category: string;
  yearsOfExperience?: number;
}

export interface CandidateVideoSectionProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
}