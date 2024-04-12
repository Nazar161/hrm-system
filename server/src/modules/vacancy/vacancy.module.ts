import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyResolver } from './vacancy.resolver';
import { ApplicationService } from '../application/application.service';

@Module({
  providers: [VacancyResolver, VacancyService, ApplicationService],
})
export class VacancyModule {}
