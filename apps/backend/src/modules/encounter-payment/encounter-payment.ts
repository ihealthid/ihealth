import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../payment/payment';
import { Encounter } from '../encounter/encounter';
import { Patient } from '../patient/patient';

@Entity()
export class EncounterPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  paymentId: string;

  @OneToOne(() => Payment, (payment) => payment.encounterPayment)
  @JoinColumn()
  payment: Payment;

  @Column()
  encounterId: string;

  @ManyToOne(() => Encounter)
  encounter: Encounter;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient)
  patient: Patient;
}
