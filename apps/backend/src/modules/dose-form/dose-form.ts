import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DoseForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  display: string;

  @Column({
    nullable: true,
  })
  definition?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
