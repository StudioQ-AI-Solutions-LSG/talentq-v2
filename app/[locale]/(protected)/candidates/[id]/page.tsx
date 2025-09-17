"use client";

import { Loader2 } from "lucide-react";
import { useCandidateDetailComments } from "../hooks/use-candidate-detail-comments";
import { useCandidateDetail } from "../hooks/use-candidates-detail";
import CandidateDetailContainer from "./components/candidate-detail-container";

interface CandidateDetailsPageProps {
  params: { id: string };
}

const CandidateDetailsPage = ({ params }: CandidateDetailsPageProps) => {
  const { id } = params;
  const { candidateDetail, isLoading, error } = useCandidateDetail(id);
  return (
    <div className="w-full">
      {!isLoading && candidateDetail ? (
        <CandidateDetailContainer
          candidateDetail={candidateDetail}
        />
      ) : (
        <div className="h-24 text-center py-4">
          {isLoading ? (
            <span className="inline-flex gap-1 items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            <p>No results were found...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateDetailsPage;
