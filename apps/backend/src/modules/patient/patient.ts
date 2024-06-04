import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Identify } from '../identify/identify';
import { Address } from '../address/address';
import { Encounter } from '../encounter/encounter';
import { PatientAllergy } from '../patient-allergy/patient-allergy';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: true
  })
  medicalRecord?: string;

  @Column()
  fullName: string;

  @Column()
  birthDate: Date;

  @Column({
    nullable: true,
  })
  phoneNumber?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Identify)
  @JoinTable()
  identifies: Identify[];

  @OneToMany(() => Address, (address) => address.patient)
  addresses: Address[];

  @OneToMany(() => Encounter, (encounter) => encounter.patient)
  encounters: Encounter[];

  @OneToMany(() => PatientAllergy, (patientAllergy) => patientAllergy.patient)
  allergies: PatientAllergy[];
}
