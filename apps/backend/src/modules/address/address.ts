import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Village } from '../village/village';
import { Patient } from '../patient/patient';
import { AddressEntry } from '../address-entry/address-entry';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  villageId: string;

  @ManyToOne(() => Village)
  village: Village;

  @OneToMany(() => AddressEntry, (entry) => entry.address)
  entries: AddressEntry[];

  @Column()
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;
}
