import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Encounter } from '../encounter/encounter';
import { EncounterAct } from '../encounter-act/encounter-act';
import { User } from '../user/user';
import { Consumable } from '../consumable/consumable';

@Entity()
export class DiagnoseEncounterAct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterId: string;

  @ManyToOne(() => Encounter)
  encounter: Encounter;

  @Column()
  encounterActId: string;

  @ManyToOne(() => EncounterAct)
  encounterAct: EncounterAct;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column({
    nullable: true,
  })
  consumableId?: string;

  @ManyToOne(() => Consumable)
  consumable?: Consumable;
}
