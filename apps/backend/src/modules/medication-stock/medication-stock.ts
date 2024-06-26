import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medication } from '../medication/medication';

@Entity()
export class MedicationStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 0,
  })
  discount: number;

  @Column({
    default: 0,
  })
  balance: number;

  @Column()
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  medicationId: string;

  @ManyToOne(() => Medication)
  medication: Medication;
}
