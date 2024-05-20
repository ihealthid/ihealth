import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FormType } from '../form-type/form-type';
import { Brand } from '../brand/brand';

@Entity()
export class Consumable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  barcode?: string;

  @Column({
    unique: true,
    nullable: true,
  })
  registeredId?: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  variant?: string;

  @Column()
  price: number;

  @Column({
    default: false,
  })
  isImported: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  brandId: string;

  @ManyToOne(() => Brand)
  brand: Brand;

  @Column()
  formTypeId: string;

  @ManyToOne(() => FormType)
  formType: FormType;
}
