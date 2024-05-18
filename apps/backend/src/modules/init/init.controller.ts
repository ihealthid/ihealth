import { Controller, Get, Query } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../user/user';
import { Role } from '../role/role';
import { EntityManager } from 'typeorm';
import { Province } from '../province/province';
import { Regency } from '../regency/regency';
import { District } from '../district/district';
import { Village } from '../village/village';
import { ParticipantTypeCode } from '../participant-type-code/participant-type-code';

import * as bcrypt from 'bcrypt';
import * as provinceJson from './province.data.json';
import * as regencyJson from './regency.data.json';
import * as districtJson from './district.data.json';
import * as villageJson from './village.data.json';
import * as participantTypeJson from './participant-type.data.json';
import * as doseFormJson from './dose-form.data.json';
import * as formTypeJson from './form-type.data.json';
import * as prescriptionStatusJson from './prescription-status.data.json';
import * as paymentStatusJson from './payment-status.data.json';

import { DoseForm } from '../dose-form/dose-form';
import { FormType } from '../form-type/form-type';
import { PrescriptionStatus } from '../prescription-status/prescription-status';
import { PaymentStatus } from '../payment-status/payment-status';

@Controller({
  path: 'init',
})
export class InitController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  async init(@Query('entity') entity: string) {
    switch (entity) {
      case 'user':
        return await this.initUser();

      case 'area': {
        await this.initProvince();
        await this.initRegency();
        await this.initDistrict();
        return await this.initVillage();
      }

      case 'participantType':
        return await this.initParticipantType();

      case 'dose-form':
        return await this.initDoseForm();

      case 'form-type':
        return this.initFormType();

      case 'prescription-status':
        return this.initPrescriptionStatus();

      case 'payment-status':
        return this.initPaymentStatus();
    }
  }

  private async initFormType() {
    for (const row of formTypeJson.data) {
      await this.entityManager.upsert(FormType, row, ['code']);
    }
  }

  private async initParticipantType() {
    for (const row of participantTypeJson.data) {
      await this.entityManager.upsert(ParticipantTypeCode, row, ['code']);
    }
  }

  private async initProvince() {
    for (const row of provinceJson.data) {
      await this.entityManager.upsert(
        Province,
        {
          id: row.code.toString(),
          name: row.display,
        },
        ['id'],
      );
    }
  }

  private async initRegency() {
    for (const row of regencyJson.data) {
      await this.entityManager.upsert(
        Regency,
        {
          id: row.code.toString(),
          provinceId: row.provinceCode.toString(),
          name: row.display,
        },
        ['id'],
      );
    }
  }

  private async initDistrict() {
    for (const row of districtJson.data) {
      await this.entityManager.upsert(
        District,
        {
          id: row.code.toString(),
          regencyId: row.regencyCode.toString(),
          name: row.display,
        },
        ['id'],
      );
    }
  }

  private async initVillage() {
    //@ts-ignore
    for (const row of villageJson.data) {
      await this.entityManager.upsert(
        Village,
        {
          id: row.code.toString(),
          districtId: row.districtCode.toString(),
          name: row.display,
        },
        ['id'],
      );
    }
  }

  private async initUser() {
    let role = await this.entityManager.findOneBy(Role, {
      name: 'Administrator',
    });
    if (!role) {
      role = this.entityManager.create(Role, {
        name: 'Administrator',
        type: 'NON_MEDIS',
      });
      await this.entityManager.save(role);
    }

    let user = await this.entityManager.findOneBy(User, {
      username: 'administrator',
    });
    if (!user) {
      user = this.entityManager.create(User, {
        username: 'administrator',
        password: bcrypt.hashSync('administrator', bcrypt.genSaltSync()),
        roles: [role],
      });
      await this.entityManager.save(user);
    } else {
      const uData = this.entityManager.merge(User, user, {
        roles: [role],
      });
      await this.entityManager.save(uData);
    }
  }

  private async initDoseForm() {
    for (const row of doseFormJson.data) {
      await this.entityManager.upsert(
        DoseForm,
        {
          display: row.display,
          definition: row.definition,
        },
        ['display'],
      );
    }
  }

  private async initPrescriptionStatus() {
    for (const row of prescriptionStatusJson.data) {
      await this.entityManager.upsert(
        PrescriptionStatus,
        {
          code: row.code,
          display: row.display,
          order: row.order,
        },
        ['code'],
      );
    }
  }

  private async initPaymentStatus() {
    for (const row of paymentStatusJson.data) {
      await this.entityManager.upsert(
        PaymentStatus,
        {
          code: row.code,
          display: row.display,
          order: row.order,
        },
        ['code'],
      );
    }
  }
}
