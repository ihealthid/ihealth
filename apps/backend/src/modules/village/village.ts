import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { District } from '../district/district';

@Entity()
export class Village {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  districtId: string;

  @ManyToOne(() => District)
  @JoinColumn()
  district: District;
}
