import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PatientCreateRequest } from './patient.request';
import {
  Pagination,
  PaginationQuery,
} from 'src/decorators/pagination.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Identify } from '../identify/identify';
import { Address } from '../address/address';
import { AddressEntry } from '../address-entry/address-entry';

@Controller({
  path: 'patients',
})
export class PatientController {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async paginate(@Pagination() paginationQuery: PaginationQuery) {
    return this.entityManager.findAndCount(Patient, {
      ...paginationQuery,
      relations: {
        identifies: true,
        address: {
          entries: true,
          village: {
            district: {
              regency: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string) {
    return this.entityManager.findOneOrFail(Patient, {
      where: { id },
      relations: {
        identifies: true,
      },
    });
  }

  @Get('/encounter/:id')
  async findByEncounterId(@Param('id') id: string) {
    return this.entityManager.findOne(Patient, {
      where: {
        encounters: {
          id,
        },
      },
      relations: {
        identifies: true,
        address: {
          entries: true,
          village: {
            district: {
              regency: {
                province: true,
              },
            },
          },
        },
      },
    });
  }

  @Post()
  async create(@Body() data: PatientCreateRequest) {
    const {
      fullName,
      birthDate,
      nik,
      address: { rt, rw, block, no, floor, address, villageId },
    } = data;
    await this.entityManager.transaction(async (trx) => {
      const patient = trx.create(Patient, {
        fullName,
        birthDate,
      });
      await trx.save(patient);

      if (nik) {
        const identify = trx.create(Identify, {
          system: 'https://fhir.kemkes.go.id/id/nik',
          value: nik,
        });
        await trx.save(identify);
        patient.identifies = [identify];
        await trx.save(patient);
      }

      const myAddress = trx.create(Address, {
        address,
        villageId,
        patientId: patient.id,
      });
      await trx.save(myAddress);

      const entries: AddressEntry[] = [];
      if (rt) {
        const entry = trx.create(AddressEntry, {
          code: 'rt',
          value: data.address.rt,
          addressId: myAddress.id,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (rw) {
        const entry = trx.create(AddressEntry, {
          code: 'rw',
          value: data.address.rw,
          addressId: myAddress.id,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (block) {
        const entry = trx.create(AddressEntry, {
          code: 'block',
          value: data.address.block,
          addressId: myAddress.id,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (no) {
        const entry = this.entityManager.create(AddressEntry, {
          code: 'no',
          value: data.address.no,
          addressId: myAddress.id,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (floor) {
        const entry = trx.create(AddressEntry, {
          code: 'floor',
          value: data.address.floor,
          addressId: myAddress.id,
        });
        await trx.save(entry);
        entries.push(entry);
      }
      myAddress.entries = entries;
      await trx.save(myAddress);
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PatientCreateRequest>,
  ) {
    await this.entityManager.transaction(async (trx) => {
      if (data.address) {
        const { address, villageId, ...rest } = data.address;
        const cAddress = await trx.findOneOrFail(Address, {
          where: {
            patientId: id,
          },
        });

        const uAddress = trx.merge(Address, cAddress, {
          address,
          villageId,
        });
        await trx.save(uAddress);

        for (const [code, value] of Object.entries(rest)) {
          await trx.upsert(
            AddressEntry,
            {
              addressId: cAddress.id,
              code,
              value,
            },
            ['addressId', 'code'],
          );
        }
      }
    });
  }
}
