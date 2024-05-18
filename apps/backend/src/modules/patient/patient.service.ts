import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Patient } from './patient';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async generateNIK(gender: 'MALE' | 'FEMALE', birthDate: string) {
    const total = await this.patientRepository.count();
    let date = dayjs(birthDate).get('date');
    if (gender === 'FEMALE') {
      date += 40;
    }

    const month = dayjs(birthDate).get('month');
    const year = dayjs(birthDate).get('year');

    return [
      'x',
      date.toString().padStart(2, '0'),
      (month + 1).toString().padStart(2, '0'),
      year.toString().slice(2),
      'y',
      (total + 1).toString().padStart(3, '0'),
    ].join('');
  }
}
