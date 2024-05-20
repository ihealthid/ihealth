import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coding } from '../coding/coding';
import { CodeSystem } from '../code-system/code-system';

@Entity()
export class CodeSystemProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  valueBoolean?: boolean;

  @Column({
    nullable: true,
  })
  valueCode?: string;

  @Column({
    nullable: true,
  })
  valueString?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  valueCodingId?: string;

  @ManyToOne(() => Coding)
  @JoinColumn()
  valueCoding?: Coding;

  @ManyToOne(() => CodeSystem)
  @JoinColumn()
  codeSystem: CodeSystem;
}
