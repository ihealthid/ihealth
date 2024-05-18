import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClassificationDiseaseGroup {
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

  @Column({
    nullable: true,
  })
  note?: string;

  @Column({
    nullable: true,
  })
  parentId?: number;

  @ManyToOne(() => ClassificationDiseaseGroup)
  @JoinColumn()
  parent?: ClassificationDiseaseGroup;
}
