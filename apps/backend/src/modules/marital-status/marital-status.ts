import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MaritalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  system: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  display: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
