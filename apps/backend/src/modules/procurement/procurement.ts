import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Distributor } from '../distributor/distributor';
import { Payment } from '../payment/payment';

@Entity()
export class Procurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  distributorId: string;

  @ManyToOne(() => Distributor)
  distributor: Distributor;

  @Column({ nullable: true })
  paymentId?: string;

  @OneToOne(() => Payment)
  payment?: Payment;
}
