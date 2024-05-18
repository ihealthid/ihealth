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
import { Practitioner } from '../practitioner/practitioner';
import { User } from '../user/user';

@Entity()
export class Participant {
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

  @ManyToOne(() => ParticipantTypeCode)
  @JoinColumn()
  type: ParticipantTypeCode;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
