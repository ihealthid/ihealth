import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { Role } from '../role/role';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
})
export class UserModule {}
