/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist';
import { UsersDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: UsersDto) {
    const user = await this.prisma.surveyor.create({
      data: {
        name: dto.name,
        email: dto.email,
      },
    });
    const token = await this.signToken(user.id, user.email);
    return {
      userId: user.id,
      access_token: token.access_token,
    };
  }

  async logIn(dto: UsersDto) {
    const user = await this.prisma.surveyor.findFirst({
      where: {
        name: dto.name,
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
