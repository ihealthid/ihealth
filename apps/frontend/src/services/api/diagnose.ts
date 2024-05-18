import { ClassificationDisease } from "./classification-disease";
import { mainApi } from "./main";
export type DiagnoseStatus = {
  id: number;
  name: string;
  order: number;
};

export type Diagnose = {
  id: number;
  encounterId: number;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  status: DiagnoseStatus;
  classificationDiseaseId?: number;
  classificationDisease?: ClassificationDisease;
  createdAt: string;
  updatedAt: string;
};

type PutDiagnoseInput = {
  encounterId: number;
  classificationDiseaseId?: number;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
};

const diagnoseApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiagnose: builder.query<{ data: Diagnose }, { encounterId: number }>({
      query: ({ encounterId }) => ({
        url: `/diagnoses/encounter/${encounterId}`,
      }),
      providesTags: ["Diagnose"],
    }),
    putDiagnose: builder.mutation<unknown, PutDiagnoseInput>({
      query: (body) => ({
        url: `/diagnoses`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Diagnose", "Encounter"],
    }),
    postDiagnose: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/diagnoses/encounter/${id}`,
        method: "post",
      }),
      invalidatesTags: ["Diagnose", "Encounter"],
    }),
  }),
});

export const {
  useGetDiagnoseQuery,
  usePutDiagnoseMutation,
  usePostDiagnoseMutation,
} = diagnoseApi;
