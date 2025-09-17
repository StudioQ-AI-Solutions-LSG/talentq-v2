"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Experience } from "../../types/candidate-detail-types";
import { capitalizeWords } from "../../../utils";

// interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   current: boolean;
//   description: string;
//   achievements: string[];
//   technologies: string[];
// }

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const calculateDuration = (
    startDate: string,
    endDate: string,
    current: boolean
  ) => {
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:briefcase" className="text-primary" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {experiences?.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-4 top-12 w-0.5 h-full bg-default-200"></div>
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center relative z-10">
                  <Icon
                    icon="heroicons:briefcase"
                    className="w-4 h-4 text-white"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-default-900">
                        {capitalizeWords(exp.title)}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Icon
                          icon="heroicons:building-office"
                          className="w-4 h-4"
                        />
                        {capitalizeWords(exp.company_name)}
                      </div>
                      {/* <div className="flex items-center gap-2 text-sm text-default-600 mt-1">
                        <Icon icon="heroicons:map-pin" className="w-4 h-4" />
                        {exp.location}
                      </div> */}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-default-600">
                        <Icon icon="heroicons:calendar" className="w-4 h-4" />
                        {formatDate(exp.start_date)} -{" "}
                        {!exp.end_date ? "Present" : formatDate(exp.end_date)}
                      </div>
                      <div className="text-xs text-default-500 mt-1">
                        {calculateDuration(
                          exp.start_date,
                          exp.end_date,
                          !exp.end_date
                        )}
                      </div>
                      {!exp.end_date && (
                        <Badge color="success" className="text-xs mt-1">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-default-600 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
                      <Icon icon="heroicons:trophy" className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    {/* <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-default-600"
                        >
                          <Icon
                            icon="heroicons:check-circle"
                            className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul> */}
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-default-900 mb-2 flex items-center gap-2">
                      <Icon
                        icon="heroicons:wrench-screwdriver"
                        className="w-4 h-4"
                      />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {/* {exp.technologies.map((tech) => (
                        <Badge key={tech} color="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
