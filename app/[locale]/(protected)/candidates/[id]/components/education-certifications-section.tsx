'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  status: "active" | "expired" | "pending";
}

interface EducationCertificationsSectionProps {
  education?: Education[];
  certifications?: Certification[];
}

const EducationCertificationsSection = ({
  education = [
    {
      id: "1",
      degree: "Bachelor of Science",
      institution: "University of California",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      gpa: "3.8",
      description: "Focused on software engineering and web development"
    },
    {
      id: "2",
      degree: "Master of Science",
      institution: "Stanford University",
      field: "Software Engineering",
      startDate: "2022",
      endDate: "2024",
      gpa: "3.9",
      description: "Specialized in modern web technologies and AI"
    }
  ],
  certifications = [
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      credentialId: "AWS-DEV-123456",
      status: "active"
    },
    {
      id: "2",
      name: "React Developer Certification",
      issuer: "Meta",
      issueDate: "2023-03-20",
      status: "active"
    },
    {
      id: "3",
      name: "Google Cloud Professional",
      issuer: "Google",
      issueDate: "2022-12-10",
      expiryDate: "2024-12-10",
      status: "expired"
    }
  ]
}: EducationCertificationsSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "expired": return "destructive";
      case "pending": return "warning";
      default: return "default";
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:academic-cap" className="text-primary" />
          Education & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-6">
        {/* Education Section */}
        <div>
          <h3 className="text-lg font-semibold text-default-900 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:building-library" className="w-5 h-5" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-primary/20 pl-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-default-900">{edu.degree}</h4>
                    <p className="text-sm text-primary font-medium">{edu.institution}</p>
                    <p className="text-sm text-default-600">{edu.field}</p>
                    {edu.description && (
                      <p className="text-xs text-default-500 mt-1">{edu.description}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-default-500">
                    <p>{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && (
                      <p className="text-xs">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-lg font-semibold text-default-900 mb-4 flex items-center gap-2">
            <Icon icon="heroicons:shield-check" className="w-5 h-5" />
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-default-50 rounded-lg border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-default-900">{cert.name}</h4>
                      <Badge 
                        color={getStatusColor(cert.status) as any}
                        className="text-xs"
                      >
                        {cert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-default-600">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-default-500 mt-1">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-default-500">
                    <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                    {cert.expiryDate && (
                      <p className="text-xs">
                        Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCertificationsSection;
