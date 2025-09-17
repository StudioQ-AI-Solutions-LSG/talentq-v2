"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Requisition } from "../../types/requisitions.types";
import { useState } from "react";
import { Upload, FileText, Download, Eye } from "lucide-react";

interface JobDescriptionCardProps {
  requisition: Requisition;
}

const JobDescriptionCard = ({ requisition }: JobDescriptionCardProps) => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock job description - replace with actual data from requisition
  const mockJobDescription = `
We are seeking a talented ${requisition.position_seniority} ${requisition.position_name} to join our dynamic team. 

## Key Responsibilities:
• Design and develop scalable web applications using modern technologies
• Collaborate with cross-functional teams to deliver high-quality software solutions
• Write clean, maintainable, and well-documented code
• Participate in code reviews and technical discussions
• Contribute to architectural decisions and best practices

## Required Qualifications:
• Bachelor's degree in Computer Science or related field
• ${requisition.position_seniority} level experience in software development
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities

## Technical Skills:
• Proficiency in modern programming languages and frameworks
• Experience with database design and optimization
• Knowledge of version control systems (Git)
• Understanding of software development lifecycle

## What We Offer:
• Competitive salary: $${requisition.rate.toLocaleString()} ${requisition.rate_type}
• Flexible working arrangements
• Professional development opportunities
• Collaborative and innovative work environment

This position offers an excellent opportunity to grow your career while working on exciting projects that make a real impact.
  `.trim();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Here you would typically read the file content and set it as job description
      // For demo purposes, we'll just show the filename
      setJobDescription(`Job description loaded from: ${file.name}`);
    }
  };

  const handleDownloadTemplate = () => {
    // Create a simple text file with job description template
    const template = `Job Description Template

Position: ${requisition.position_name}
Seniority: ${requisition.position_seniority}
Rate: $${requisition.rate} ${requisition.rate_type}

[Add your job description content here]

Key Responsibilities:
• 
• 
• 

Required Qualifications:
• 
• 
• 

Technical Skills:
• 
• 
• 

What We Offer:
• 
• 
• `;

    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requisition.position_name.replace(/\s+/g, '_')}_job_description.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Job Description</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              className="text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Template
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs"
            >
              <label htmlFor="job-description-upload" className="cursor-pointer">
                <Upload className="w-3 h-3 mr-1" />
                Upload
                <input
                  id="job-description-upload"
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* File Upload Status */}
        {uploadedFile && (
          <div className="mb-4 p-3 bg-info/10 rounded-lg border border-info/20">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-info" />
              <span className="text-sm font-medium text-info">
                File uploaded: {uploadedFile.name}
              </span>
              <Badge color="secondary" className="ml-auto text-xs">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </Badge>
            </div>
          </div>
        )}

        {/* Job Description Content */}
        <div className="space-y-4">
          <div className="bg-default-50 rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="heroicons:document-text" className="w-4 h-4 text-default-600" />
              <span className="text-sm font-medium text-default-700">
                Current Job Description
              </span>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-default-700 leading-relaxed font-sans">
                {jobDescription || mockJobDescription}
              </pre>
            </div>
          </div>

          {/* Job Details Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-default-50 rounded-lg p-3">
              <div className="text-xs text-default-500 mb-1">Position</div>
              <div className="font-medium text-sm">{requisition.position_name}</div>
            </div>
            <div className="bg-default-50 rounded-lg p-3">
              <div className="text-xs text-default-500 mb-1">Seniority</div>
              <div className="font-medium text-sm">{requisition.position_seniority}</div>
            </div>
            <div className="bg-default-50 rounded-lg p-3">
              <div className="text-xs text-default-500 mb-1">Rate</div>
              <div className="font-medium text-sm">
                ${requisition.rate.toLocaleString()} {requisition.rate_type}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" className="text-xs">
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionCard;
