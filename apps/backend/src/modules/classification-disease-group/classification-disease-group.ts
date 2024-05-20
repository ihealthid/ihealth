import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassificationDiseaseGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  display: string;

  @Column({
    nullable: true,
  })
  definition?: string;

  @Column({
    nullable: true,
  })
  note?: string;

  @Column({
    nullable: true,
  })
  parentId?: string;

  @ManyToOne(() => ClassificationDiseaseGroup)
  @JoinColumn()
  parent?: ClassificationDiseaseGroup;
}
