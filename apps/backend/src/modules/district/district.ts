import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Regency } from '../regency/regency';

@Entity()
export class District {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  regencyId: string;

  @ManyToOne(() => Regency)
  @JoinColumn()
  regency: Regency;
}
