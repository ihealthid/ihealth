import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ActEncounterCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
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

  @ManyToMany(() => ActEncounterCode)
  @JoinTable()
  parents?: ActEncounterCode[];
}
