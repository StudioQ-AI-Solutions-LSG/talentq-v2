'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

interface CandidateSummarySectionProps {
  candidateName?: string;
  currentPosition?: string;
  location?: string;
  expectedSalary?: string;
  availability?: string;
  experience?: string;
  summary?: string;
  keyStrengths?: string[];
  achievements?: string[];
}

const CandidateSummarySection = ({
  candidateName = "Albert Flores",
  currentPosition = "Senior Frontend Developer",
  location = "San Francisco, CA",
  expectedSalary = "$80,000 - $120,000",
  availability = "Available",
  experience = "5+ years",
  summary = "Experienced Frontend Developer with a passion for creating exceptional user experiences. Proven track record of delivering high-quality applications and leading development teams.",
  keyStrengths = [
    "Expert in React and TypeScript",
    "Strong leadership and mentoring skills",
    "Excellent problem-solving abilities",
    "Proven track record of successful project delivery"
  ],
  achievements = [
    "Led development of 3 major applications",
    "Improved team productivity by 40%",
    "Mentored 5+ junior developers",
    "Consistently exceeded project deadlines"
  ]
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
          <h3 className="text-lg font-semibold text-default-900 mb-2">{candidateName}</h3>
          <p className="text-default-600 mb-3">{currentPosition}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge color="primary">
              <Icon icon="heroicons:map-pin" className="w-3 h-3 mr-1" />
              {location}
            </Badge>
            <Badge color="success">
              <Icon icon="heroicons:currency-dollar" className="w-3 h-3 mr-1" />
              {expectedSalary}
            </Badge>
            <Badge color="info">
              <Icon icon="heroicons:check-circle" className="w-3 h-3 mr-1" />
              {availability}
            </Badge>
            <Badge color="warning">
              <Icon icon="heroicons:academic-cap" className="w-3 h-3 mr-1" />
              {experience}
            </Badge>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
            <Icon icon="heroicons:document-text" className="w-4 h-4" />
            Professional Summary
          </h4>
          <p className="text-sm text-default-600 leading-relaxed">{summary}</p>
        </div>

        {/* Key Strengths */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:star" className="w-4 h-4" />
            Key Strengths
          </h4>
          <ul className="space-y-2">
            {keyStrengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-default-600">
                <Icon icon="heroicons:check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Achievements */}
        <div>
          <h4 className="text-sm font-medium text-default-900 mb-3 flex items-center gap-2">
            <Icon icon="heroicons:trophy" className="w-4 h-4" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-default-600">
                <Icon icon="heroicons:star" className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateSummarySection;
