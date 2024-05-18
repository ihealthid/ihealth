import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient';
import { Allergy } from '../allergy/allergy';

@Entity()
export class PatientAllergy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  severity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  patientId: number;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  @Column()
  allergyId: number;

  @ManyToOne(() => Allergy)
  @JoinColumn()
  allergy: Allergy;
}
