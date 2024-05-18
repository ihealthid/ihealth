import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isArray } from 'class-validator';
import { ClassificationDiseaseGroup } from '../classification-disease-group/classification-disease-group';
import { Repository } from 'typeorm';
import { ClassificationDisease } from './classification-disease';

interface Diag {
  name: string;
  desc: string;
  inclusionTerm: { note: string };
}

interface Section {
  desc: string;
  diag?:
    | (Omit<Diag, 'inclusionTerm'> & { diag: Diag[] })
    | (Omit<Diag, 'inclusionTerm'> & { diag: Diag[] })[];
}

interface Chapter {
  name: number;
  desc: string;
  includes: {
    note: string;
  };
  section: Section[];
}

interface Data {
  chapter: Chapter[];
}

@Injectable()
export class ClassificationDiseaseService {
  constructor(
    @InjectRepository(ClassificationDiseaseGroup)
    private groupRepository: Repository<ClassificationDiseaseGroup>,
    @InjectRepository(ClassificationDisease)
    private diseaseRepository: Repository<ClassificationDisease>,
  ) {}

  private getName(value: string) {
    return value.substring(value.length - 9).substring(1, 8);
  }

  private getDescription(value: string) {
    return value.substring(0, value.length - 9).trim();
  }

  async create(data: Data) {
    const { chapter } = data;
    for (const row of chapter) {
      const parentGroup = await this.groupRepository.upsert(
        {
          display: this.getName(row.desc),
          definition: this.getDescription(row.desc),
          note: row.includes?.note,
        },
        ['display'],
      );

      if (row.section) {
        await this.createChildrenGroup(
          parentGroup.generatedMaps[0].id,
          isArray(row.section) ? row.section : [row.section],
        );
      }
    }
  }

  private async createChildrenGroup(parentId: number, section: Section[]) {
    for (const row of section) {
      const group = await this.groupRepository.upsert(
        {
          parentId,
          display: this.getName(row.desc),
          definition: this.getDescription(row.desc),
        },
        ['display'],
      );

      if (row.diag) {
        await this.createItem(
          group.generatedMaps[0].id,
          isArray(row.diag) ? row.diag : [row.diag],
        );
      }
    }
  }

  private async createItem(
    groupId: number,
    diag: (Omit<Diag, 'inclusionTerm'> & { diag: Diag[] })[],
  ) {
    for (const row of diag) {
      const item = await this.diseaseRepository.upsert(
        {
          groupId,
          display: row.name,
          definition: row.desc,
        },
        ['display'],
      );

      if (row.diag) {
        await this.createChildrenItem(
          item.generatedMaps[0].id,
          groupId,
          isArray(row.diag) ? row.diag : [row.diag],
        );
      }
    }
  }

  private async createChildrenItem(
    parentId: number,
    groupId: number,
    diag: (Diag & { inclusionTerm: { note: string } })[],
  ) {
    for (const row of diag) {
      await this.diseaseRepository.upsert(
        {
          parentId,
          display: row.name,
          groupId,
          definition: row.desc,
        },
        ['display'],
      );
    }
  }
}
