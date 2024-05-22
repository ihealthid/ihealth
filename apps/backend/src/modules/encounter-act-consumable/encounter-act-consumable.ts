import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EncounterAct } from '../encounter-act/encounter-act';
import { Consumable } from '../consumable/consumable';

@Entity()
export class EncounterActConsumable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  encounterActId: string;

  @ManyToOne(() => EncounterAct)
  encounterAct: EncounterAct;

  @Column()
  consumableId: string;

  @ManyToOne(() => Consumable)
  consumable: Consumable;
}
