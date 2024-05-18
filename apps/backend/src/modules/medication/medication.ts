import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoseForm } from '../dose-form/dose-form';
import { MedicationStock } from '../medication-stock/medication-stock';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  bpom: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  doseFormId: number;

  @ManyToOne(() => DoseForm)
  @JoinColumn()
  doseForm: DoseForm;

  @OneToMany(() => MedicationStock, (stock) => stock.medication)
  stocks: MedicationStock[];
}
