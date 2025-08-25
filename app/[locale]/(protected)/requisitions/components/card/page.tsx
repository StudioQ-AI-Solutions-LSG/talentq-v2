"use client";

import SiteBreadcrumb from "@/components/site-breadcrumb";
import BasicCard from "./basic-card";
import MarketingImageCard from "./marketing-image-card";
import SalesAutomationCard from "./sales-automation-card";
import { RequisitionCard } from "../requisition-card";

// Mock data for demonstration
const mockRequisition = {
  id: "1",
  position_name: "Senior React Developer",
  custom_name: "TechCorp Inc.",
  status: "active",
  position_seniority: "senior",
  start_date: "2024-01-15",
  rate: 85000,
  rate_type: "yearly",
  skills: [],
  created_at: 1705276800000, // Unix timestamp for 2024-01-15
  accepted_assignments_count: 0,
  rejected_assignments_count: 0,
  division_id: "1",
  position_id: "1",
  interview_assignments_count: 0,
  in_progress_assignments_count: 0,
  was_confirmed_by_the_customer: false,
  was_confirmed_by_the_organization: false
};

const Card = () => {
  const handleViewDetails = (id: string) => {
    console.log("View details for requisition:", id);
  };

  return (
    <div>
      <SiteBreadcrumb />
      <div className="space-y-8">
        {/* Original Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Original Card Components</h2>
          <BasicCard />
          <MarketingImageCard />
          <SalesAutomationCard />
        </div>

        {/* Requisitions Cards Comparison */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Requisitions Cards Comparison</h2>
          
          {/* V1 vs V2 Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Original RequisitionCard (V1)</h3>
              <RequisitionCard 
                requisition={mockRequisition} 
                onViewDetails={handleViewDetails} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
