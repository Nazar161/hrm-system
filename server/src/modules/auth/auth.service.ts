import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { SignInInput } from './dto/inputs/signin.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const { email, username, firstName, lastName, password } = signUpInput;
    const hashedPassword = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        firstName,
        lastName,
        hashedPassword,
      },
    });

    const { accessToken, refreshToken } = await this.createTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const doPasswordsMatch = await argon.verify(user.hashedPassword, signInInput.password);

    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }

    const { accessToken, refreshToken } = await this.createTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    return { loggedOut: true };
  }

  findAll() {
    return `This action returns all auth`;
  }

  async createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '15m',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async getNewTokens(userId: string, rToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const doRefreshTokenMatch = await argon.verify(user.hashedRefreshToken, rToken);

    if (!doRefreshTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }

    const { accessToken, refreshToken } = await this.createTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
