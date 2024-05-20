import { Body, Controller, Get, Post } from '@nestjs/common';
import { AllergyByEncounterCreateRequest } from './patient-allergy.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Allergy } from '../allergy/allergy';
import { Patient } from '../patient/patient';
import { PatientAllergy } from './patient-allergy';

@Controller({
  path: 'patient-allergies',
})
export class PatientAllergyController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async paginateByEncounter(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(PatientAllergy, {
      ...paginationQuery,
      relations: {
        allergy: true,
      },
    });
  }

  @Post('/encounter')
  async createByEncounter(
    @Body() { encounterId, name, level }: AllergyByEncounterCreateRequest,
  ) {
    await this.entityManager.transaction(async (trx) => {
      let allergy = await trx.findOneBy(Allergy, {
        name,
      });

      if (!allergy) {
        allergy = trx.create(Allergy, {
          name,
        });
        await trx.save(allergy);
      }

      const patient = await trx.findOneByOrFail(Patient, {
        encounters: {
          id: encounterId,
        },
      });

      const patientAllergy = trx.create(PatientAllergy, {
        allergy,
        patient,
        severity: level,
      });
      await trx.save(patientAllergy);
    });
  }
}
