import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ParticipantTypeCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  system: string;

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

  @Column({
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  parentId?: string;

  @ManyToOne(() => ParticipantTypeCode)
  @JoinColumn()
  parent?: ParticipantTypeCode;
}
