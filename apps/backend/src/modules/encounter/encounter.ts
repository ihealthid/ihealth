import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient';
import { Participant } from '../participant/participant';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import { PatientCondition } from '../patient-condition/patient-condition';
import { Prescription } from '../prescription/prescription';
import { DiagnoseEncounterAct } from '../diagnose-encounter-act/diagnose-encounter-act';
import { Diagnose } from '../diagnose/diagnose';
import { Observation } from '../observation/observation';

@Entity()
export class Encounter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  periodStart: Date;

  @Column({
    nullable: true,
  })
  periodEnd?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  @Column()
  healthcareServiceId: string;

  @ManyToOne(() => HealthcareService)
  @JoinColumn()
  healthcareService: HealthcareService;

  @Column()
  patientConditionId: string;

  @ManyToOne(() => PatientCondition)
  @JoinColumn()
  patientCondition: PatientCondition;

  @OneToMany(() => Participant, (participant) => participant.encounter)
  participants: Participant[];

  @OneToMany(() => EncounterHistory, (history) => history.encounter)
  histories: EncounterHistory[];

  @OneToMany(() => Prescription, (prescription) => prescription.encounter)
  prescriptions: Prescription[];

  @OneToMany(() => DiagnoseEncounterAct, (act) => act.encounterId)
  diagnoseEncounterActs: DiagnoseEncounterAct[];

  @OneToMany(() => Diagnose, (diagnose) => diagnose.encounter)
  diagnoses: Diagnose[];

  @OneToOne(() => Observation, (observation) => observation.encounter)
  observation: Observation;
}
