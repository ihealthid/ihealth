import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import * as _ from 'lodash';
import { SatuSehatResponse } from './interfaces/response';
import { Patient, PatientInput } from './interfaces/patient';
import { createIdentifier } from './helpers/identifier';
import { createTelecom } from './helpers/telecom';

@Injectable()
export class SatuSehatService {
  private authUrl = 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1';
  private baseUrl = 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async generateToken() {
    const client_id = this.configService.get<string>('SATUSEHAT_CLIENT_ID');
    const client_secret = this.configService.get<string>(
      'SATUSEHAT_CLIENT_SECRET',
    );

    const { data } = await firstValueFrom(
      this.httpService
        .post(
          this.authUrl + '/accesstoken?grant_type=client_credentials',
          new URLSearchParams({
            client_id,
            client_secret,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(
          catchError((err: AxiosError<any>) => {
            throw 'Error while generate access token';
          }),
        ),
    );

    await this.cacheManager.set(
      'satusehat.accessToken',
      data.access_token,
      parseInt(data.expires_in),
    );

    return data.access_token;
  }

  private async getToken() {
    let token = await this.cacheManager.get<string>('satusehat.accessToken');
    if (!token) {
      token = await this.generateToken();
    }
    return token;
  }

  async findPatientByNIK(nik: string) {
    const token = await this.getToken();
    const identifier = `https://fhir.kemkes.go.id/id/nik|${nik}`;
    const { data } = await firstValueFrom<
      AxiosResponse<SatuSehatResponse<Patient>>
    >(
      this.httpService
        .get(this.baseUrl + `/Patient`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            identifier,
          },
        })
        .pipe(
          catchError((err: AxiosError<any>) => {
            throw 'Error while getting data from Satu Sehat';
          }),
        ),
    );

    return data;
  }

  async findPatientByNIKIbu(nik: string) {
    const token = await this.getToken();
    const identifier = `https://fhir.kemkes.go.id/id/nik-ibu|${nik}`;
    const { data } = await firstValueFrom<
      AxiosResponse<SatuSehatResponse<Patient>>
    >(
      this.httpService
        .get(this.baseUrl + `/Patient`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            identifier,
          },
        })
        .pipe(
          catchError((err: AxiosError<any>) => {
            console.log(err);
            throw 'Error while getting data from Satu Sehat';
          }),
        ),
    );

    return data;
  }

  async findPatientById(id: string) {
    const token = await this.getToken();
    const { data } = await firstValueFrom<
      AxiosResponse<SatuSehatResponse<Patient>>
    >(
      this.httpService
        .get(this.baseUrl + `/Patient/` + id, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .pipe(
          catchError((err: AxiosError<any>) => {
            console.log(err);
            throw 'Error while getting data from Satu Sehat';
          }),
        ),
    );

    return data;
  }

  async findPatient({
    name,
    birthdate,
    nik,
    gender,
  }: {
    name: string;
    birthdate: string;
    nik?: string;
    gender?: string;
  }) {
    const token = await this.getToken();
    const identifier = `https://fhir.kemkes.go.id/id/nik|${nik}`;

    const { data } = await firstValueFrom<
      AxiosResponse<SatuSehatResponse<Patient>>
    >(
      this.httpService
        .get(this.baseUrl + `/Patient?identifier=`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          params: {
            identifier: nik ? identifier : undefined,
            name,
            birthdate,
            gender,
          },
        })
        .pipe(
          catchError((err: AxiosError<any>) => {
            console.log(err);
            throw 'Error while getting data from Satu Sehat';
          }),
        ),
    );

    return data;
  }

  async createPatientByNIK(input: PatientInput) {
    const data = {
      resourceType: 'Patient',
      meta: {
        profile: ['https://fhir.kemkes.go.id/r4/StructureDefinition/Patient'],
      },
      identifier: [createIdentifier('nik', input.nik)],
      active: true,
      name: [
        {
          use: 'official',
          text: input.name,
        },
      ],
      telecom: [],
      gender: input.gender,
      birthDate: input.birthDate,
      deceasedBoolean: false,
      address: [
        {
          use: 'home',
          line: [
            'Gd. Prof. Dr. Sujudi Lt.5, Jl. H.R. Rasuna Said Blok X5 Kav. 4-9 Kuningan',
          ],
          city: 'Jakarta',
          postalCode: '12950',
          country: 'ID',
          extension: [
            {
              url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode',
              extension: [
                {
                  url: 'province',
                  valueCode: '10',
                },
                {
                  url: 'city',
                  valueCode: '1010',
                },
                {
                  url: 'district',
                  valueCode: '1010101',
                },
                {
                  url: 'village',
                  valueCode: '1010101101',
                },
                {
                  url: 'rt',
                  valueCode: '2',
                },
                {
                  url: 'rw',
                  valueCode: '2',
                },
              ],
            },
          ],
        },
      ],
      maritalStatus: {
        coding: [
          input.maritalStatus
        ],
        text: 'Married',
      },
      multipleBirthInteger: 0,
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
                  code: 'C',
                },
              ],
            },
          ],
          name: {
            use: 'official',
            text: 'Jane Smith',
          },
          telecom: [
            {
              system: 'phone',
              value: '0690383372',
              use: 'mobile',
            },
          ],
        },
      ],
      communication: [
        {
          language: {
            coding: [
              {
                system: 'urn:ietf:bcp:47',
                code: 'id-ID',
                display: 'Indonesian',
              },
            ],
            text: 'Indonesian',
          },
          preferred: true,
        },
      ],
      extension: [
        {
          url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace',
          valueAddress: {
            city: 'Bandung',
            country: 'ID',
          },
        },
        {
          url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus',
          valueCode: 'WNI',
        },
      ],
    };

    if (input.telecom) {
      if (input.telecom.phone) {
        data.telecom.push(
          createTelecom('phone', 'mobile', input.telecom.phone),
        );
      }

      if (input.telecom.email) {
        data.telecom.push(createTelecom('email', 'home', input.telecom.email));
      }
    }
  }

  async createPatientByNIKIbu() {
    throw new NotImplementedException();
  }
}
