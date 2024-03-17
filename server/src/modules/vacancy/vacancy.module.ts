import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyResolver } from './vacancy.resolver';

@Module({
  providers: [VacancyResolver, VacancyService],
})
export class VacancyModule {}
