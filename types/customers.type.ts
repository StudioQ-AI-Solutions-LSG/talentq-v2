type Status = "active" | "inactive" | "pending";

export interface Customer {
  is_active: boolean;
  id: string;
  created_at: string;
  name: string;
  url_logo: string | null;
  status: Status;
}

export interface CustomerResponse {
  data: Customer[];
  error?: string;
}

export interface Division {
  id: string;
  label: string;
  value: string;
  name: string;
}
