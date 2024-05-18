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
import { Encounter } from '../encounter/encounter';
import { PrescriptionItem } from '../prescription-item/prescription-item';
import { PrescriptionStatus } from '../prescription-status/prescription-status';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterId: number;

  @ManyToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;

  @OneToMany(() => PrescriptionItem, (items) => items.prescription)
  items: PrescriptionItem[];

  @Column({
    nullable: true,
  })
  statusId?: number;

  @ManyToOne(() => PrescriptionStatus)
  @JoinColumn()
  status?: PrescriptionStatus;
}
