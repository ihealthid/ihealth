import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../user/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user || !bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const { password, ...payload } = user;

    return payload;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
