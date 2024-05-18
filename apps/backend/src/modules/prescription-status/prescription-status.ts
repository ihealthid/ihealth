import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrescriptionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  code: string;

  @Column()
  display: string;

  @Column()
  order: number;
}
