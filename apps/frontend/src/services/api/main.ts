import { privateBaseQuery } from "@/utils/fetch-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: privateBaseQuery(),
  tagTypes: [
    "Admission",
    "Allergy",
    "PatientAllergy",
    "Province",
    "Regency",
    "District",
    "Village",
    "ClassificationDisease",
    "HealthcareService",

    "Manufacture",
    "Brand",
    "Distributor",
    "FormType",
    "Consumable",
    "ConsumableStock",

    "Diagnose",
    "DiagnoseEncounterAct",

    "Encounter",
    "EncounterAct",
    "EncounterActConsumable",
    "EncounterStatus",

    "Ingredient",
    "Medication",
    "MedicationIngredient",
    "MedicationStock",

    "Patient",
    "PrescriptionItem",
    "Prescription",
    "RoleType",
    "Role",
    "User",
    "MaritalStatus",
    "ContactRole",
    "DischargeDisposition",
    "CodeSystemType",
    "CodeSystem",
    "Observation",
    "ActEncounterCode",
    "ParticipantTypeCode",
    "PatientCondition",

    "Procurement",
    "Payment",
    "PaymentMethod",
  ],
  endpoints: () => ({}),
});
