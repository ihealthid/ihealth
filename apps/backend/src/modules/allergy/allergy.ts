import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatientAllergy } from '../patient-allergy/patient-allergy';

@Entity()
export class Allergy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PatientAllergy, (patientAllergy) => patientAllergy.allergy)
  patientAllergies: PatientAllergy[];
}
