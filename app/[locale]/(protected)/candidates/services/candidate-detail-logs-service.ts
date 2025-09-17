import { httpV2 } from "@/lib/api/axios";
import { Log } from "../types/candidate-detail-logs-type";

export const candidateDetailLogsService = {
  getCandidateDetailLogs: async (id: string): Promise<any> => {
    try {
      const url = `candidate/assignment/${id}/history`;
      return await httpV2.get<Log[]>(url);
    } catch (error) {
      console.error(
        "Error fetching candidate details logs:",
        `for candidate id: ${id}`,
        error
      );
      throw error;
    }
  },
};

export default candidateDetailLogsService;
