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
import { PaymentMethd } from '../payment-method/payment-method';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  statusId: string;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn()
  status: PaymentStatus;

  @Column()
  methodId: string;

  @ManyToOne(() => PaymentMethd)
  method: PaymentMethd;
}
