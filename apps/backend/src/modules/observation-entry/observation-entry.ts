import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Observation } from '../observation/observation';

@Entity()
export class ObservationEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  observationId: number

  @ManyToOne(() => Observation)
  observation: Observation;
}
