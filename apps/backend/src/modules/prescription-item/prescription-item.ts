import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Prescription } from '../prescription/prescription';
import { Medication } from '../medication/medication';

@Entity()
export class PrescriptionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  frequency: string;

  @Column()
  doses: number;

  @Column({
    nullable: true,
  })
  note?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  prescriptionId: string;

  @ManyToOne(() => Prescription)
  @JoinColumn()
  prescription: Prescription;

  @Column()
  medicationId: string;

  @ManyToOne(() => Medication)
  medication: Medication;
}
