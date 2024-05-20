import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActEncounterCode } from '../act-encounter-code/act-encounter-code';
import { Patient } from '../patient/patient';
import { Participant } from '../participant/participant';
import { EncounterHistory } from '../encounter-history/encounter-history';
import { HealthcareService } from '../healthcare-service/healthcare-service';
import { PatientCondition } from '../patient-condition/patient-condition';
import { Prescription } from '../prescription/prescription';

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

  @Column()
  actEncounterCodeId: string;

  @ManyToOne(() => ActEncounterCode)
  @JoinColumn()
  actEncounterCode: ActEncounterCode;

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
}
