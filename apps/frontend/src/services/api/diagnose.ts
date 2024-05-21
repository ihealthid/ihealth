import { ClassificationDisease } from "./classification-disease";
import { mainApi } from "./main";

export type DiagnoseStatus = {
  id: string;
  name: string;
  order: number;
};

export type Diagnose = {
  id: string;
  encounterId: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  status: DiagnoseStatus;
  classificationDiseaseId?: string;
  classificationDisease?: ClassificationDisease;
  createdAt: string;
  updatedAt: string;
};

type PutDiagnoseInput = {
  encounterId: string;
  classificationDiseaseId?: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
};

const diagnoseApi = mainApi.injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    getDiagnose: query<{ data: Diagnose }, { encounterId: string }>({
      query: ({ encounterId }) => ({
        url: `/diagnoses/encounter/${encounterId}`,
      }),
      providesTags: ["Diagnose"],
    }),
    putDiagnose: mutation<unknown, PutDiagnoseInput>({
      query: (body) => ({
        url: `/diagnoses`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Diagnose", "Encounter"],
    }),
    postDiagnose: mutation<unknown, string>({
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
