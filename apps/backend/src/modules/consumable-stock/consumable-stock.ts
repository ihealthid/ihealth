import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consumable } from '../consumable/consumable';

@Entity()
export class ConsumableStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  balance: number;

  @Column()
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  returnedAt?: Date;

  @Column()
  consumableId: number;

  @ManyToOne(() => Consumable)
  consumable: Consumable;
}
