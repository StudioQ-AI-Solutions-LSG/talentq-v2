export interface ThirdPartyIntegration {
  integration: {
    id: string;
  };
}

export interface UserInformation {
  name: string;
  email: string;
  type: string;
}

export interface Comment {
  id: string;
  created_at: number;
  requisition_position_assignment_id: string;
  user_id: number;
  comment: string;
  created_by: string;
  third_party_integration: ThirdPartyIntegration;
  user_information: UserInformation;
}