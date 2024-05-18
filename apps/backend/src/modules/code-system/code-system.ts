import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CodeSystemType } from '../code-system-type/code-system-type';
import { CodeSystemProperty } from '../code-system-property/code-system-property';

@Entity()
export class CodeSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  system: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  display?: string;

  @Column({
    nullable: true,
  })
  definition?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  typeId: number;

  @ManyToOne(() => CodeSystemType)
  @JoinColumn()
  type: CodeSystemType;

  @ManyToMany(() => CodeSystem)
  @JoinTable()
  parents?: CodeSystem[];

  @OneToMany(() => CodeSystemProperty, (property) => property.codeSystem)
  properties: CodeSystemProperty[];
}
