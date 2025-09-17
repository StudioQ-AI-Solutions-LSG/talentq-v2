"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CandidateVideoSectionProps } from "../../types/candidate-detail-types";

const CandidateVideoSection = ({
  videoUrl,
  thumbnailUrl,
  title,
}: CandidateVideoSectionProps) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-normal flex items-center gap-2">
          <Icon icon="heroicons:video-camera" className="text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative bg-default-100 rounded-lg overflow-hidden">
          {videoUrl ? (
            <video controls className="w-full h-75" poster={thumbnailUrl}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-default-200">
              <div className="text-center">
                <Icon
                  icon="heroicons:video-camera"
                  className="text-4xl text-default-400 mb-2 mx-auto"
                />
                <p className="text-default-500">No video available</p>
              </div>
            </div>
          )}
        </div>

        {videoUrl && (
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" color="primary">
              <Icon icon="heroicons:play" className="mr-2" />
              Play Video
            </Button>
            <Button size="sm" variant="ghost">
              <Icon icon="heroicons:arrow-down-tray" className="mr-2" />
              Download
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateVideoSection;
