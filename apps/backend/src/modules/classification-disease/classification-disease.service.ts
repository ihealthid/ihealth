import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { isArray } from 'class-validator';
import { ClassificationDiseaseGroup } from '../classification-disease-group/classification-disease-group';
import { EntityManager } from 'typeorm';
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
    @InjectEntityManager()
    private entityManager: EntityManager,
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
      const parentGroup = await this.entityManager.upsert(
        ClassificationDiseaseGroup,
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

  private async createChildrenGroup(parentId: string, section: Section[]) {
    for (const row of section) {
      const group = await this.entityManager.upsert(
        ClassificationDiseaseGroup,
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
    groupId: string,
    diag: (Omit<Diag, 'inclusionTerm'> & { diag: Diag[] })[],
  ) {
    for (const row of diag) {
      const item = await this.entityManager.upsert(
        ClassificationDisease,
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
    parentId: string,
    groupId: string,
    diag: (Diag & { inclusionTerm: { note: string } })[],
  ) {
    for (const row of diag) {
      await this.entityManager.upsert(
        ClassificationDisease,
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
