import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassificationDiseaseGroup } from '../classification-disease-group/classification-disease-group';

@Entity()
export class ClassificationDisease {
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

  @Column()
  groupId: string;

  @ManyToOne(() => ClassificationDiseaseGroup)
  group: ClassificationDiseaseGroup;

  @Column({
    nullable: true,
  })
  parentId?: string;

  @ManyToOne(() => ClassificationDisease)
  @JoinColumn()
  parent?: ClassificationDisease;

  @OneToMany(() => ClassificationDisease, (child) => child.parent)
  children: ClassificationDisease[];
}
