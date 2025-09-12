"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import RequisitionInfoCard from "./components/requisition-info-card";
import CandidatesTable from "./components/candidates-table";
import JobDescriptionCard from "./components/job-description-card";
import SkillsListCard from "./components/skills-list-card";
import AvailabilityChips from "./components/availability-chips";
import { Requisition, AvailabilityOption } from "../types/requisitions.types";
import { useRequisition } from "../hooks/useRequisitions";
import { useCandidatesStore } from "@/store/candidate.store";

// Mock data for development
const mockRequisition: Requisition = {
  id: "mock-requisition-1",
  rate: "85000",
  skills: [
    {
      id: "skill-1",
      name: "React",
      type: "hard",
      requisition_position_skill_id: "req-skill-1",
      is_mandatory: false,
    },
    {
      id: "skill-2",
      name: "TypeScript",
      type: "hard",
      requisition_position_skill_id: "req-skill-2",
      is_mandatory: false,
    },
    {
      id: "skill-3",
      name: "Node.js",
      type: "hard",
      requisition_position_skill_id: "req-skill-3",
      is_mandatory: false,
    },
    {
      id: "skill-4",
      name: "Communication",
      type: "soft",
      requisition_position_skill_id: "req-skill-4",
      is_mandatory: false,
    },
    {
      id: "skill-5",
      name: "Teamwork",
      type: "soft",
      requisition_position_skill_id: "req-skill-5",
      is_mandatory: false,
    }
  ],
  status: "Active",
  rate_type: "annual",
  created_at: Date.now(),
  start_date: "2024-01-15",
  end_date: "2024-06-15",
  custom_name: "Senior Full Stack Developer",
  position_name: "Full Stack Developer",
  position_seniority: "Senior",
  accepted_assignments_count: 2,
  rejected_assignments_count: 1,
  interview_assignments_count: 3,
  in_progress_assignments_count: 5,
  was_confirmed_by_the_customer: true,
  was_confirmed_by_the_organization: false
};

const RequisitionDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    selected_customer: selectedCustomer,
    selected_division: selectedDivision,
  } = useCandidatesStore();
  const { requisition, isLoading, error, updateRequisition, isUpdating } = useRequisition(id, selectedCustomer, selectedDivision);

  // Función para manejar actualizaciones de availabilities
  const handleUpdateAvailabilities = (newAvailabilities: AvailabilityOption[]) => {
    if (requisition) {
      updateRequisition({
        id: requisition.id,
        availabilities: newAvailabilities
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !requisition) {
    return <div>Error loading requisition</div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-default-900">
            {requisition.custom_name || requisition.position_name}
          </h1>
          <p className="text-sm text-default-600 mt-1">
            {requisition.position_seniority} • {requisition.status}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Requisition Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <RequisitionInfoCard requisition={requisition} />
          <SkillsListCard skills={requisition.skills} />
          <AvailabilityChips 
            availabilities={requisition.availabilities}
            onUpdateAvailabilities={handleUpdateAvailabilities}
            isEditable={true}
            isUpdating={isUpdating}
          />
        </div>

        {/* Right Column - Job Description and Candidates */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <JobDescriptionCard requisition={requisition} />
          <CandidatesTable requisitionId={id} />
        </div>
      </div>
    </div>
  );
};

export default RequisitionDetailsPage;
