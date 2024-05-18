import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  display: string;
}
