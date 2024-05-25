import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { RoleModule } from './modules/role/role.module';
import { RoleTypeModule } from './modules/role-type/role-type.module';
import { MedicationModule } from './modules/medication/medication.module';
import { HealthcareServiceModule } from './modules/healthcare-service/healthcare-service.module';
import { ConsumableModule } from './modules/consumable/consumable.module';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';
import { EncounterModule } from './modules/encounter/encounter.module';
import { DiagnoseModule } from './modules/diagnose/diagnose.module';
import { ClassificationDiseaseModule } from './modules/classification-disease/classification-disease.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { PrescriptionItemModule } from './modules/prescription-item/prescription-item.module';
import { AuthModule } from './modules/auth/auth.module';
import { AllergyModule } from './modules/allergy/allergy.module';
import { ProvinceModule } from './modules/province/province.module';
import { RegencyModule } from './modules/regency/regency.module';
import { DistrictModule } from './modules/district/district.module';
import { VillageModule } from './modules/village/village.module';
import { EncounterStatusModule } from './modules/encounter-status/encounter-status.module';
import { ConfigModule } from '@nestjs/config';
// import { SatuSehatModule } from './third-party/satu-sehat/satu-sehat.module';
import { CacheModule } from '@nestjs/cache-manager';
import { InitModule } from './modules/init/init.module';
import { IdentifyModule } from './modules/identify/identifier.module';
import { AddressModule } from './modules/address/address.module';
import { ParticipantTypeCodeModule } from './modules/participant-type-code/participant-type-code.module';
import { PractitionerModule } from './modules/practitioner/practitioner.module';
import { MaritalStatusModule } from './modules/marital-status/marital-status.module';
import { PatientConditionModule } from './modules/patient-condition/patient-condition.module';
import { ObservationModule } from './modules/observation/observation.module';
import { PatientAllergyModule } from './modules/patient-allergy/patient-allergy.module';
import { DoseFormModule } from './modules/dose-form/dose-form.module';
import { RFIDModule } from './modules/rfid/rfid.module';
import { ManufactureModule } from './modules/manufacture/manufacture.module';
import { BrandModule } from './modules/brand/brand.module';
import { FormTypeModule } from './modules/form-type/form-type.module';
import { ConsumableStockModule } from './modules/consumable-stock/consumable-stock.module';
import { PaymentStatusModule } from './modules/payment-status/payment-status.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MedicationStockModule } from './modules/medication-stock/medication-stock.module';
import { PrescriptionStatusModule } from './modules/prescription-status/prescription-status.module';
import { DiagnoseStatusModule } from './modules/diagnose-status/diagnose-status.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { ClassificationDiseaseGroupModule } from './modules/classification-disease-group/classification-disease-group.module';
import { AddressEntryModule } from './modules/address-entry/address-entry.module';
import { EncounterHistoryModule } from './modules/encounter-history/encounter-history.module';
import { ObservationEntryModule } from './modules/observation-entry/observation-entry.module';
import { EncounterActModule } from './modules/encounter-act/encounter-act.module';
import { DiagnoseEncounterActModule } from './modules/diagnose-encounter-act/diagnose-encounter-act.module';
import { EncounterActConsumableModule } from './modules/encounter-act-consumable/encounter-act-consumable.module';
import { DistributorModule } from './modules/distributor/distributor.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { EncounterPaymentModule } from './modules/encounter-payment/encounter-payment.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { MedicationIngredientModule } from './modules/medication-ingredient/medication-ingredient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProvinceModule,
    RegencyModule,
    DistrictModule,
    VillageModule,

    RoleTypeModule,
    RoleModule,

    ManufactureModule,
    BrandModule,
    DistributorModule,
    ProcurementModule,
    FormTypeModule,
    DoseFormModule,
    IngredientModule,
    MedicationModule,
    MedicationIngredientModule,
    MedicationStockModule,
    ConsumableModule,
    ConsumableStockModule,

    HealthcareServiceModule,
    // ObservationEntryModule,
    UserModule,
    AuthModule,

    IdentifyModule,
    AddressModule,
    AddressEntryModule,
    PatientModule,

    ParticipantTypeCodeModule,
    MaritalStatusModule,
    PatientConditionModule,

    PaymentMethodModule,
    PaymentStatusModule,
    PaymentModule,

    PractitionerModule,

    EncounterStatusModule,
    EncounterHistoryModule,
    EncounterModule,
    EncounterActModule,
    EncounterActConsumableModule,
    EncounterPaymentModule,

    ObservationModule,
    ObservationEntryModule,
    DiagnoseStatusModule,
    DiagnoseModule,
    DiagnoseEncounterActModule,
    ParticipantModule,
    ClassificationDiseaseModule,
    ClassificationDiseaseGroupModule,
    PrescriptionStatusModule,
    PrescriptionModule,
    PrescriptionItemModule,
    AllergyModule,
    PatientAllergyModule,

    // SatuSehatModule,
    InitModule,

    RFIDModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
