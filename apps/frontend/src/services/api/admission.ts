import { mainApi } from "./main";

export type PostAdmissionInput = {
  patientId: number;
  healthcareServiceId: number;
  patientConditionId: number;
};

const admissionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    
    deleteAdmission: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/admissions/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Admission"],
    }),
  }),
});

export const { useDeleteAdmissionMutation } =
  admissionApi;
