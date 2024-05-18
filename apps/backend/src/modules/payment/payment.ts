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
import { PaymentStatus } from '../payment-status/payment-status';
import { Encounter } from '../encounter/encounter';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  statusId: number;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn()
  status: PaymentStatus;

  @Column()
  encounterId: number;

  @OneToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;
}
