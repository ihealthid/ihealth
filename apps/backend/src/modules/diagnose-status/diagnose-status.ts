import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DiagnoseStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  display: string;
}
