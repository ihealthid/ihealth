import { EncounterStatus } from '../encounter-status/encounter-status';
import { Encounter } from '../encounter/encounter';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EncounterHistory {
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

  @ManyToOne(() => EncounterStatus)
  @JoinColumn()
  status: EncounterStatus;
}
