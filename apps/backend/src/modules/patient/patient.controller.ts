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
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient';
import { DataSource, Repository } from 'typeorm';
import { Identify } from '../identify/identify';
import { Address } from '../address/address';
import { AddressEntry } from '../address-entry/address-entry';

@Controller({
  path: 'patients',
})
export class PatientController {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Identify)
    private identifyRepository: Repository<Identify>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(AddressEntry)
    private addressEntryRepository: Repository<AddressEntry>,
    private dataSource: DataSource,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async paginate(@Pagination() { take, skip, filter }: PaginationQuery) {
    return this.patientRepository.findAndCount({
      take,
      skip,
      where: filter,
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
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.patientRepository.findOneOrFail({
      where: { id },
      relations: {
        identifies: true,
      },
    });
  }

  @Get('/encounter/:id')
  async findByEncounterId(@Param('id', ParseIntPipe) id: number) {
    return this.patientRepository.findOne({
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
                province: true
              }
            }
          }
        }
      }
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
    await this.dataSource.manager.transaction(async (trx) => {
      const patient = this.patientRepository.create({
        fullName,
        birthDate,
      });

      if (nik) {
        const identify = this.identifyRepository.create({
          system: 'https://fhir.kemkes.go.id/id/nik',
          value: nik,
        });
        await trx.save(identify);
        patient.identifies = [identify];
      }

      const entries: AddressEntry[] = [];
      if (rt) {
        const entry = this.addressEntryRepository.create({
          code: 'rt',
          value: data.address.rt,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (rw) {
        const entry = this.addressEntryRepository.create({
          code: 'rw',
          value: data.address.rw,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (block) {
        const entry = this.addressEntryRepository.create({
          code: 'block',
          value: data.address.block,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (no) {
        const entry = this.addressEntryRepository.create({
          code: 'no',
          value: data.address.no,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      if (floor) {
        const entry = this.addressEntryRepository.create({
          code: 'floor',
          value: data.address.floor,
        });
        await trx.save(entry);
        entries.push(entry);
      }

      const myAddress = this.addressRepository.create({
        address,
        villageId,
        entries,
      });
      await trx.save(myAddress);
      patient.address = myAddress;

      await trx.save(patient);
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<PatientCreateRequest>,
  ) {
    await this.dataSource.transaction(async (trx) => {
      if (data.address) {
        const { address, villageId, ...rest } = data.address;
        const cAddress = await this.addressRepository.findOneOrFail({
          where: {
            patientId: id,
          },
        });

        const uAddress = this.addressRepository.merge(cAddress, {
          address,
          villageId,
        });
        await this.addressRepository.save(uAddress);

        for (const [code, value] of Object.entries(rest)) {
          await this.addressEntryRepository.upsert(
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
