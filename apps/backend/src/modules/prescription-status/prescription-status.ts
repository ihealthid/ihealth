import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrescriptionStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  display: string;

  @Column()
  order: number;
}
