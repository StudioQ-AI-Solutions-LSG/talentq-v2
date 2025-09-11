// Tipos para las skills que vienen del backend
export interface RequisitionSkill {
    id: string;
    name: string;
    type: 'hard' | 'soft';
    is_mandatory: boolean;
    requisition_position_skill_id: string;
  }

// Tipos para las availabilities
export interface AvailabilityOption {
  id: string;
  type: 'location' | 'schedule' | 'team_size';
  label: string;
  value: string;
  color?: string;
}

// Tipo principal de Requisition basado en la respuesta real del backend
export interface Requisition {
  id: string;
  rate: string;
  skills: RequisitionSkill[];
  status: string;
  rate_type: string;
  created_at: number;
  start_date: string;
  end_date: string;
  custom_name: string;
  position_name: string;
  position_seniority: string;
  accepted_assignments_count: number;
  rejected_assignments_count: number;
  interview_assignments_count: number;
  in_progress_assignments_count: number;
  was_confirmed_by_the_customer: boolean;
  was_confirmed_by_the_organization: boolean;
  additional_requirements?: string;
  availabilities?: AvailabilityOption[];
  experience_years?: string;
  job_description?: string;
  job_description_file?: string | null;
  job_description_file_name?: string | null;
  on_site_days?: string;
  position_expectations?: string;
  quantity_of_resources?: number;
  third_party_integrations?: {
    lsg: string;
    leantech: string;
  };
}

// Mapeo de estados del backend a nuestros tipos internos
export type RequisitionStatus = 'Active' | 'Inactive' | 'Pending' | 'Closed';
export type RequisitionSeniority = 'Junior' | 'Mid' | 'Senior' | 'Architect' | 'Lead';

// Filtros que coinciden con los parámetros del backend
export interface RequisitionFilters {
  search_criteria?: string;
  status?: string;
  skills?: string[];
  seniority_id?: string;
  position_id?: string;
  customer_id?: string;
  division_id?: string;
  page?: number;
  page_size?: number;
}

// Respuesta real del backend
export interface RequisitionListResponse {
  items: Requisition[];
  itemsTotal: number;
}

// Para compatibilidad con el código existente, mantenemos la interfaz anterior
export interface RequisitionListResponseLegacy {
  requisitions: Requisition[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  page_size?: number;
  total_count?: number;
}

// Request para crear una nueva requisition
export interface CreateRequisitionRequest {
  custom_name: string;
  position_name: string;
  position_seniority: string;
  skills: string[]; // Array de skill IDs
  rate: number;
  rate_type: string;
  start_date: string;
  end_date?: string;
  status: string;
  customer_id?: string;
  division_id?: string;
    additional_requirements?: string; 
    availabilities?: AvailabilityOption[]; 
    experience_years?: string;
  job_description?: string;
  job_description_file?: string | null;
  job_description_file_name?: string | null;
  on_site_days?: string;
  position_expectations?: string;
  quantity_of_resources?: number;
  third_party_integrations?: {
    lsg?: string;
    leantech?: string;
  };
}

// Request para actualizar una requisition
export interface UpdateRequisitionRequest extends Partial<CreateRequisitionRequest> {
  id: string;
}

// Estadísticas basadas en la respuesta real
export interface RequisitionStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  closed: number;
  by_seniority: Record<string, number>;
  by_position: Record<string, number>;
  by_customer: Record<string, number>;
  by_division: Record<string, number>;
  assignments_summary: {
    total_accepted: number;
    total_rejected: number;
    total_interview: number;
    total_in_progress: number;
  };
}
