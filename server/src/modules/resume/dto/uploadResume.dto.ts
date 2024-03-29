import { IsNotEmpty, IsString } from 'class-validator';

export class UploadResumeDto {
  @IsNotEmpty()
  @IsString()
  candidateId: string;
}
