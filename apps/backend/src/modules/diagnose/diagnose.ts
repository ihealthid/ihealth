import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Encounter } from '../encounter/encounter';
import { ClassificationDisease } from '../classification-disease/classification-disease';
import { DiagnoseStatus } from '../diagnose-status/diagnose-status';

@Entity()
export class Diagnose {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  subjective?: string;

  @Column({
    nullable: true,
  })
  objective?: string;

  @Column({
    nullable: true,
  })
  assessment?: string;

  @Column({
    nullable: true,
  })
  plan?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterId: number;

  @ManyToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;

  @Column({
    nullable: true,
  })
  classificationDiseaseId?: number;

  @ManyToOne(() => ClassificationDisease)
  @JoinColumn()
  classificationDisease?: ClassificationDisease;

  @Column({
    nullable: true,
  })
  statusId?: number;

  @ManyToOne(() => DiagnoseStatus)
  @JoinColumn()
  status: Diagnose;
}
