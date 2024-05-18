import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Province } from '../province/province';

@Entity()
export class Regency {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  provinceId: string;

  @ManyToOne(() => Province)
  @JoinColumn()
  province: Province;
}
