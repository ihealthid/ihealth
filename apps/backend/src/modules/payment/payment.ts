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
import { PaymentMethd } from '../payment-method/payment-method';
import { EncounterPayment } from '../encounter-payment/encounter-payment';

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
  status: PaymentStatus;

  @Column()
  methodId: string;

  @ManyToOne(() => PaymentMethd)
  method: PaymentMethd;

  @Column({
    nullable: true,
  })
  encounterPaymentId?: string;

  @OneToOne(() => EncounterPayment, encounter => encounter.payment)
  @JoinColumn()
  encounterPayment?: EncounterPayment;
}
