import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '../payment-status/payment-status';
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
