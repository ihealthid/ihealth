import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as _ from 'lodash';
import { Between, ILike, In } from 'typeorm';

export interface PaginationQuery {
  take: number;
  skip: number;
  sort: Record<string, any>;
  filter: Record<string, any>;
}

export const Pagination = createParamDecorator(
  (data: Record<string, any>, ctx: ExecutionContext) => {
    const { query } = ctx.switchToHttp().getRequest();
    const page = query.page ? parseInt(query.page) : data?.page ?? 1;
    const take = query.limit ? parseInt(query.limit) : data?.limit ?? 10;
    const skip = (page - 1) * take;
    const sort = createSorter(query.sort);
    const filter = createFilter(query.filter);

    return {
      take,
      skip,
      sort,
      filter,
      where: filter,
      order: sort,
    };
  },
);

const createSorter = (data = '') => {
  const o = {};
  _.forEach(_.split(data, ',').filter(Boolean), (arrString) => {
    const [key, value] = _.split(arrString, ':', 2);
    _.set(o, key, value);
  });
  return o;
};

const createFilter = (data = '') => {
  const o = {};
  const operator = {
    iLike: (value: string) => ILike(`%${value}%`),
    in: (value: string) => In(value.split('|')),
    of: (value: string) => value,
    dateAt: (value: string) => {
      const start = new Date(value);
      start.setHours(0, 0, 1);

      const end = new Date(value);
      end.setHours(23, 59, 59);

      return Between(start, end);
    },
  };
  _.forEach(_.split(data, ',').filter(Boolean), (filter) => {
    const [key, op, value] = _.split(filter, ':', 3);
    if (value) {
      _.set(o, key, operator[op](value));
    }
  });
  return o;
};
