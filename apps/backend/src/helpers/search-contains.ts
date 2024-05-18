import { ILike } from 'typeorm';
export const contains = (search: string) => ILike(`%${search}%`);
