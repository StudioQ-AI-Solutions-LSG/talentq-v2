'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface CandidateCVSectionProps {
  cvUrl?: string;
  fileName?: string;
  fileSize?: string;
  uploadedDate?: string;
}

const CandidateCVSection = ({ 
  cvUrl = "/documents/candidate-cv.pdf",
  fileName = "John_Doe_Resume.pdf",
  fileSize = "2.4 MB",
  uploadedDate = "2024-01-15"
}: CandidateCVSectionProps) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:document-text" className="text-primary" />
          Resume / CV
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-4 p-4 bg-default-50 rounded-lg border">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon icon="heroicons:document-text" className="text-2xl text-primary" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-default-900 truncate">
              {fileName}
            </h4>
            <div className="flex items-center gap-4 text-xs text-default-500 mt-1">
              <span className="flex items-center gap-1">
                <Icon icon="heroicons:arrow-down-tray" className="w-3 h-3" />
                {fileSize}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="heroicons:calendar" className="w-3 h-3" />
                {uploadedDate}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" color="primary">
              <Icon icon="heroicons:eye" className="mr-2" />
              View
            </Button>
            <Button size="sm" variant="ghost">
              <Icon icon="heroicons:arrow-down-tray" className="mr-2" />
              Download
            </Button>
          </div>
        </div>
      
      </CardContent>
    </Card>
  );
};

export default CandidateCVSection;

