import { httpV2 } from "@/lib/api/axios";
import { Comment } from "../types/candidate-detail-comments-types";

export const candidateDetailCommentsService = {
  getCandidateDetailComments: async (id: string): Promise<any> => {
    try {
      const url = `candidate/assignment/${id}/comments`;
      return await httpV2.get<Comment[]>(url);
    } catch (error) {
      console.error(
        "Error fetching candidate details comments:",
        `for candidate id: ${id}`,
        error
      );
      throw error;
    }
  },
  saveComment: async (id: string, comment: string): Promise<any> => {
    try {
      const url = `candidate/assignment/${id}/comment`;
      return await httpV2.post<Comment>(url, { comment });
    } catch (error) {
      console.error(
        "Error saving candidate details comments:",
        `for candidate id: ${id}`,
        error
      );
      throw error;
    }
  },
};

export default candidateDetailCommentsService;
