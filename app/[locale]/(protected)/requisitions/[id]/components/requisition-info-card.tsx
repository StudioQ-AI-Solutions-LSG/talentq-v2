"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Requisition } from "../../types/requisitions.types";
import { formatDistanceToNow } from "date-fns";

interface RequisitionInfoCardProps {
  requisition: Requisition;
}

const RequisitionInfoCard = ({ requisition }: RequisitionInfoCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/20 text-success border-success/30";
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "closed":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "inactive":
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
      default:
        return "bg-info/20 text-info border-info/30";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const getElapsedTime = (startDate: string) => {
    try {
      return formatDistanceToNow(new Date(startDate), { addSuffix: true });
    } catch {
      return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Requisition Details</span>
          <Badge className={getStatusColor(requisition.status)}>
            {requisition.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-default-900">
              {requisition.custom_name || requisition.position_name}
            </h3>
            <p className="text-sm text-default-600">
              {requisition.position_seniority}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-default-500">Start Date:</span>
              <p className="font-medium">{formatDate(requisition.start_date)}</p>
            </div>
            <div>
              <span className="text-default-500">End Date:</span>
              <p className="font-medium">{formatDate(requisition.end_date)}</p>
            </div>
          </div>

          <div className="text-sm">
            <span className="text-default-500">Elapsed Time:</span>
            <p className="font-medium">{getElapsedTime(requisition.start_date)}</p>
          </div>

          <div className="text-sm">
            <span className="text-default-500">Rate:</span>
            <p className="font-medium">
              ${requisition.rate} {requisition.rate_type}
            </p>
          </div>
        </div>

        {/* Counters */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-default-700 mb-3">
            Candidate Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-info/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon
                  className="w-5 h-5 text-info"
                  icon="heroicons:user-plus"
                />
              </div>
              <div className="text-lg font-semibold text-info">
                {requisition.in_progress_assignments_count}
              </div>
              <div className="text-xs text-default-600">New</div>
            </div>

            <div className="bg-warning/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon
                  className="w-5 h-5 text-warning"
                  icon="heroicons:chat-bubble-left-right"
                />
              </div>
              <div className="text-lg font-semibold text-warning">
                {requisition.interview_assignments_count}
              </div>
              <div className="text-xs text-default-600">Interview</div>
            </div>

            <div className="bg-success/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon
                  className="w-5 h-5 text-success"
                  icon="heroicons:check-circle"
                />
              </div>
              <div className="text-lg font-semibold text-success">
                {requisition.accepted_assignments_count}
              </div>
              <div className="text-xs text-default-600">Approved</div>
            </div>

            <div className="bg-destructive/10 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon
                  className="w-5 h-5 text-destructive"
                  icon="heroicons:x-circle"
                />
              </div>
              <div className="text-lg font-semibold text-destructive">
                {requisition.rejected_assignments_count}
              </div>
              <div className="text-xs text-default-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Confirmation Status Removed, commented just in case we need to use it in the future.*/} 
        {/* <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-default-700 mb-3">
            Confirmation Status
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-default-600">Customer Confirmed:</span>
              <Badge
                color={requisition.was_confirmed_by_the_customer ? "default" : "secondary"}
                className={requisition.was_confirmed_by_the_customer ? "bg-success/20 text-success" : ""}
              >
                {requisition.was_confirmed_by_the_customer ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-default-600">Organization Confirmed:</span>
              <Badge
                color={requisition.was_confirmed_by_the_organization ? "default" : "secondary"}
                className={requisition.was_confirmed_by_the_organization ? "bg-success/20 text-success" : ""}
              >
                {requisition.was_confirmed_by_the_organization ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default RequisitionInfoCard;
