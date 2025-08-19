import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Candidate } from "../types/candidates.types";
import SeeMoreButton from "./see-more-button";

const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    // Handle empty or null/undefined strings
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CandidateBox = ({ candidate }: { candidate: Candidate }) => {
  const t = useTranslations("EcommerceApp");
  return (
    <Card className="p-4 rounded-md group">
      <div className=" bg-default-200 dark:bg-default-900 h-[191px] flex flex-col justify-center items-center mb-3 relative rounded-md">
        <div className={candidate.photo ? "h-[191px] w-full" : "h-[191px]"}>
          <Image
            width={146}
            height={191}
            className="  h-full w-full  object-fill  transition-all duration-300 "
            src={candidate.photo || "/talentq_default_profile.png"}
            alt={candidate.name}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center ">
          <p className="text-xs	text-default-900 uppercase font-normal">
            {candidate.name + " " + candidate.last_name}
          </p>
        </div>
        <h6 className="text-default-900 text-base	font-medium	mt-2 truncate	">
          {candidate.seniority_name + " " + candidate.role}
        </h6>
        <p className="text-default-500  text-xs  font-normal mt-1.5 line-clamp-5">
          {candidate.resume}
        </p>
        <h6 className="text-default-900 text-base	font-medium	mt-2 truncate	">
          {"$ " +
            candidate.rate?.toFixed(2) +
            " / " +
            capitalizeFirstLetter(candidate.rate_type) +
            " Rate"}
        </h6>
        <br />
        <Link href={`/candidates/${candidate.id}`}>
          <SeeMoreButton />
        </Link>
      </div>
    </Card>
  );
};

export default CandidateBox;
