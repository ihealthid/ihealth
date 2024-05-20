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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  severity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  @Column()
  allergyId: string;

  @ManyToOne(() => Allergy)
  @JoinColumn()
  allergy: Allergy;
}
