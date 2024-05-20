import { EntityResponse } from "@/types/entity-response";
import { mainApi } from "./main";

export type PostAdmissionInput = {
  patientId: string;
  healthcareServiceId: string;
  patientConditionId: string;
};

const admissionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAdmission: builder.mutation<EntityResponse<any>, string>({
      query: (id) => ({
        url: `/admissions/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Admission"],
    }),
  }),
});

export const { useDeleteAdmissionMutation } = admissionApi;
