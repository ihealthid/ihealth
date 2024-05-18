import { PrescriptionItem } from "./prescription-item";
import { Patient } from "./patient";
import { mainApi } from "./main";
import { PaginationResult } from "@/types/pagination-result";
import { PaginationQueryParams } from "@/types/pagination-query-params";

export type Prescription = {
  id: number;
  items: PrescriptionItem[];
  status: number;
  createdAt: string;
  updatedAt: string;
};

interface PostPrescriptionResult {
  data: Omit<Prescription, "items">;
}

const prescriptionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptions: builder.query<
      PaginationResult<Prescription>,
      PaginationQueryParams
    >({
      query: () => ({
        url: "/prescriptions",
      }),
      providesTags: ["Prescription"],
    }),
    getPrescription: builder.query<
      { data: Prescription & { encounter?: { patient: Patient } } },
      number
    >({
      query: (id) => ({
        url: `/prescriptions/${id}`,
      }),
      providesTags: ["Prescription", "PrescriptionItem"],
    }),
    getPrescriptionByEncounterId: builder.query<{ data: Prescription }, number>(
      {
        query: (id) => ({
          url: `/prescriptions/encounter/${id}`,
        }),
        providesTags: ["Prescription", "PrescriptionItem"],
      },
    ),
    postPrescription: builder.mutation<PostPrescriptionResult, void>({
      query: () => ({
        url: "/prescriptions",
        method: "post",
      }),
      invalidatesTags: ["Prescription", "PrescriptionItem"],
    }),
    donePrescription: builder.mutation<PostPrescriptionResult, number>({
      query: (id) => ({
        url: "/prescriptions/done",
        method: "post",
        body: { id },
      }),
      invalidatesTags: ["Prescription", "MedicationStock"],
    }),
  }),
});

export const {
  useGetPrescriptionByEncounterIdQuery,
  useLazyGetPrescriptionByEncounterIdQuery,
  useGetPrescriptionsQuery,
  useGetPrescriptionQuery,
  usePostPrescriptionMutation,
  useDonePrescriptionMutation,
} = prescriptionApi;
