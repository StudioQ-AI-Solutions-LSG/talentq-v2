import { httpV2 } from "@/lib/api/axios";
import { getQueryString } from "../../utils";
import {
  CandidateDetail,
  CandidateDetailParams,
} from "../types/candidate-detail-types";

export const candidateDetailService = {
  getCandidateDetail: async (params: CandidateDetailParams): Promise<any> => {
    try {
      const { id, ...newParams } = params;

      const queryString = getQueryString(newParams);
      const url = `candidate/assignment/${id}${
        queryString ? `?${queryString}` : ""
      }`;
      return await httpV2.get<CandidateDetail[]>(url);
    } catch (error) {
      console.error(
        "Error fetching candidate details:",
        params.selected_division
          ? `for division: ${params.selected_division}`
          : "error",
        params,
        error
      );
      throw error;
    }
  },
};

export default candidateDetailService;
