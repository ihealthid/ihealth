import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PatientCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
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
