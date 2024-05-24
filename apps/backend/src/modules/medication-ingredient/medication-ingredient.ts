import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from '../ingredient/ingredient';
import { Medication } from '../medication/medication';

@Entity()
export class MedicationIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  ingredientId: string;

  @ManyToOne(() => Ingredient)
  ingredient: Ingredient;

  @Column()
  medicationId: string;

  @ManyToOne(() => Medication)
  medication: Medication;
}
