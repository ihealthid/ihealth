import { EntityResponse } from "@/types/entity-response";
import { mainApi } from "./main";

interface BaseObservation {
  entries: { type: string; value: string; code: string }[];
}

export interface Observation extends Partial<BaseObservation> {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ObservationUpdateInput extends Partial<BaseObservation> {
  encounterId: string;
}

const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getObservationByEncounterId: builder.query<
      EntityResponse<Observation>,
      { encounterId: string }
    >({
      query: ({ encounterId }) => ({
        url: `/observations/encounter/${encounterId}`,
      }),
      providesTags: ["Observation"],
    }),
    updateObservation: builder.mutation<unknown, ObservationUpdateInput>({
      query: ({ encounterId, ...body }) => ({
        url: `/observations/${encounterId}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Observation", "Encounter"],
    }),
  }),
});

export const {
  useGetObservationByEncounterIdQuery,
  useUpdateObservationMutation,
} = api;
