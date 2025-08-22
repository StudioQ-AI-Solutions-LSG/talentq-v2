import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Candidate } from "../types/candidates.types";
import { MapPin } from "lucide-react";

// Fallback randoms
const defaultSkills = [
  { id: "1", name: "Teamwork", type: "soft", candidate_skill_id: "1" },
  { id: "2", name: "Communication", type: "soft", candidate_skill_id: "2" },
  { id: "3", name: "Problem Solving", type: "soft", candidate_skill_id: "3" },
  { id: "4", name: "React", type: "tech", candidate_skill_id: "4" },
  { id: "5", name: "Node.js", type: "tech", candidate_skill_id: "5" },
];

const defaultLocations = ["New York, USA", "Bogotá, Colombia", "Remote"];
const defaultRequisitions = [
  "Frontend Developer",
  "Project Manager",
  "Data Analyst",
];

// Chip color palette
const chipColors = [
  { bg: "bg-green-100", text: "text-green-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
  { bg: "bg-purple-100", text: "text-purple-600" },
];

const toPascalCase = (str: string): string =>
  str ? str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : str;

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CandidateBox = ({ candidate }: { candidate: Candidate }) => {
  const t = useTranslations("EcommerceApp");

  // Random helpers
  const randomLocation =
    candidate.location ||
    defaultLocations[Math.floor(Math.random() * defaultLocations.length)];

  const randomRequisition =
    candidate.requisition_name ||
    defaultRequisitions[Math.floor(Math.random() * defaultRequisitions.length)];

  const randomSkills =
    candidate.skills && candidate.skills.length > 0
      ? candidate.skills.slice(0, 2) // only 2 max
      : defaultSkills.sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <Link href={`/candidates/${candidate.id}`}>
      <Card
        className="group p-6 rounded-2xl shadow-md border border-gray-200 bg-white flex flex-col h-full 
                   transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer
                   hover:border-gray-400"
      >
        {/* Top section */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Profile photo */}
          <div className="col-span-1 flex justify-center">
            <div
              className="aspect-square w-28 max-w-[7rem] rounded-full overflow-hidden 
               border-2 border-gray-800 shadow-md 
               ring-1 ring-gray-600/40 
               transition-all duration-300 
               group-hover:scale-105 group-hover:shadow-lg"
            >
              <Image
                width={112}
                height={112}
                className="w-full h-full object-cover"
                src={candidate.photo || "/talentq_default_profile.png"}
                alt={candidate.name}
              />
            </div>
          </div>

          {/* Main info */}
          <div className="col-span-2">
            <p className="text-base font-semibold text-gray-900 truncate">
              {toPascalCase(candidate.name) +
                " " +
                toPascalCase(candidate.last_name)}
            </p>
            <p className="text-sm font-medium text-[#FF6A3D] mt-1 truncate">
              {candidate.seniority_name + " " + candidate.role}
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <MapPin size={14} className="mr-1 text-gray-400" />
              {randomLocation}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-5 flex flex-col flex-grow">
          {/* Requisition */}
          <div className="bg-gray-100 px-3 py-1 rounded-md text-xs text-gray-600 shadow-sm inline-block">
            Requisition:{" "}
            <span className="font-medium text-gray-900">
              {randomRequisition}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm font-normal mt-3 line-clamp-3 flex-grow">
            {candidate.resume}
          </p>

          {/* Skills chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {randomSkills.map((skill, i) => {
              const color = chipColors[i % chipColors.length];
              return (
                <span
                  key={skill.id}
                  className={`px-3 py-1 text-xs rounded-full ${color.bg} ${color.text} font-medium`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>

          {/* Rate */}
          <div className="mt-4">
            <span className="inline-block bg-gray-50 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold shadow-sm">
              {"$ " +
                candidate.rate?.toFixed(2) +
                " / " +
                capitalizeFirstLetter(candidate.rate_type) +
                " Rate"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CandidateBox;
