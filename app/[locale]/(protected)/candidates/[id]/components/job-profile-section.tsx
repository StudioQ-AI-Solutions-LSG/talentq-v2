"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { capitalizeWords } from "../../../utils";
import { CandidateDetail } from "../../types/candidate-detail-types";

interface CandidateSummarySectionProps {
  candidateDetail: CandidateDetail;
}

const DEFAULT_AVAILABILITY = "Available";
const DEFAULT_EXPERIENCE = "5+ years";

const CandidateSummarySection = ({
  candidateDetail,
}: CandidateSummarySectionProps) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:user" className="text-primary" />
          Candidate Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {/* Candidate Header */}
        <div>
          <h3 className="text-lg font-semibold text-default-900 mb-2">
            {capitalizeWords(
              `${candidateDetail.name} ${candidateDetail.last_name}`
            )}
          </h3>
          <p className="text-default-600 mb-3">
            {" "}
            {capitalizeWords(
              `${candidateDetail.seniority_name} ${candidateDetail.role}`
            )}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge color="primary">
              <Icon icon="heroicons:map-pin" className="w-3 h-3 mr-1" />
              {candidateDetail.location}
            </Badge>
            {/* <Badge color="success">
              <Icon icon="heroicons:currency-dollar" className="w-3 h-3 mr-1" />
              {expectedSalary}
            </Badge> */}
            <Badge color="info">
              <Icon icon="heroicons:check-circle" className="w-3 h-3 mr-1" />
              {DEFAULT_AVAILABILITY}
            </Badge>
            <Badge color="warning">
              <Icon icon="heroicons:academic-cap" className="w-3 h-3 mr-1" />
              {DEFAULT_EXPERIENCE}
            </Badge>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
            <Icon icon="heroicons:document-text" className="w-4 h-4" />
            Professional Summary
          </h4>
          <p className="text-sm text-default-600 leading-relaxed">
            {candidateDetail.resume}
          </p>
        </div>

        {/* Key Strengths */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:star" className="w-4 h-4" />
            Key Strengths
          </h4>
          <ul className="space-y-2">
            {/* {keyStrengths.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-default-600"
              >
                <Icon
                  icon="heroicons:check"
                  className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
                />
                {strength}
              </li>
            ))} */}
          </ul>
        </div>

        {/* Key Achievements */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:trophy" className="w-4 h-4" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {/* {achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-default-600"
              >
                <Icon
                  icon="heroicons:star"
                  className="w-4 h-4 text-warning mt-0.5 flex-shrink-0"
                />
                {achievement}
              </li>
            ))} */}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateSummarySection;
