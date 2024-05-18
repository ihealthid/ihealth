import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AllergyByEncounterCreateRequest } from './patient-allergy.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Allergy } from '../allergy/allergy';
import { Patient } from '../patient/patient';
import { PatientAllergy } from './patient-allergy';

@Controller({
  path: 'patient-allergies',
})
export class PatientAllergyController {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(PatientAllergy)
    private patientAllergyRepository: Repository<PatientAllergy>,
    @InjectRepository(Allergy)
    private allergyRepository: Repository<Allergy>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  @Get('/encounter/:id')
  async paginateByEncounter(
    @Pagination() { take, skip, filter, sort }: PaginationQuery,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.patientAllergyRepository.findAndCount({
      take,
      skip,
      where: {
        ...filter,
        patient: {
          encounters: {
            id,
          },
        },
      },
      order: sort,
      relations: {
        allergy: true
      }
    });
  }

  @Post('/encounter')
  async createByEncounter(
    @Body() { encounterId, name, level }: AllergyByEncounterCreateRequest,
  ) {
    await this.dataSource.transaction(async (trx) => {
      let allergy = await this.allergyRepository.findOneBy({
        name,
      });

      if (!allergy) {
        allergy = this.allergyRepository.create({
          name,
        });
        await trx.save(allergy);
      }

      const patient = await this.patientRepository.findOneByOrFail({
        encounters: {
          id: encounterId,
        },
      });

      const patientAllergy = this.patientAllergyRepository.create({
        allergy,
        patient,
        severity: level,
      });
      await trx.save(patientAllergy);
    });
  }
}
