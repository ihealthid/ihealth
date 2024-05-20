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
import { ParticipantTypeCode } from '../participant-type-code/participant-type-code';
import { User } from '../user/user';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterId: string;

  @ManyToOne(() => Encounter)
  @JoinColumn()
  encounter: Encounter;

  @ManyToOne(() => ParticipantTypeCode)
  @JoinColumn()
  type: ParticipantTypeCode;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
