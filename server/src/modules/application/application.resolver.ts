import { Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Application } from './entities/application.entity';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}
}
