import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Village } from '../village/village';
import { Identify } from '../identify/identify';
import { Patient } from '../patient/patient';
import { AddressEntry } from '../address-entry/address-entry';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => AddressEntry, entry => entry.address)
  entries: AddressEntry[];

  @Column()
  patientId: number;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;
}
