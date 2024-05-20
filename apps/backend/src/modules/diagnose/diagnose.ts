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
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  encounterId: string;

  @ManyToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;

  @Column({
    nullable: true,
  })
  classificationDiseaseId?: string;

  @ManyToOne(() => ClassificationDisease)
  @JoinColumn()
  classificationDisease?: ClassificationDisease;

  @Column({
    nullable: true,
  })
  statusId?: string;

  @ManyToOne(() => DiagnoseStatus)
  @JoinColumn()
  status: Diagnose;
}
