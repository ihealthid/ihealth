import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Province {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
