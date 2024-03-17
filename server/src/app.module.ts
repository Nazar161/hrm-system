import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './modules/auth/guards/accessToken.guard';
import { CandidateModule } from './modules/candidate/candidate.module';
import { ResumeModule } from './modules/resume/resume.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GcsModule } from './modules/gcs/gcs.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { ApplicationModule } from './modules/application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        useGlobalPrefix: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    AuthModule,
    UserModule,
    CandidateModule,
    ResumeModule,
    PrismaModule,
    GcsModule,
    VacancyModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [PrismaService, { provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
