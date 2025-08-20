import EmptyProject from "./empty";
import CandidateBox from "./candidate-box";
import { Candidate } from "../types/candidates.types";

const CandidateList = ({ candidates }: { candidates: Candidate[] }) => {
  if (candidates.length === 0) return <EmptyProject />;
  return (
    <div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max py-5">
        {candidates?.map((candidate, i) => (
          <CandidateBox key={`grid_key_${i}`} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
