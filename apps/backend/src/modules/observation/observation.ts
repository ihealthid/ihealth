import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Encounter } from '../encounter/encounter';
import { ObservationEntry } from '../observation-entry/observation-entry';

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterId: string;

  @OneToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;

  @OneToMany(() => ObservationEntry, (entry) => entry.observation)
  entries: ObservationEntry[];
}
