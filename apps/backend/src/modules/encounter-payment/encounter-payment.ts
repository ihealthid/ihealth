import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from '../payment/payment';
import { Encounter } from '../encounter/encounter';

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

  @OneToOne(() => Payment)
  payment: Payment;

  @Column()
  encounterId: string;

  @ManyToOne(() => Encounter)
  encounter: Encounter;
}
