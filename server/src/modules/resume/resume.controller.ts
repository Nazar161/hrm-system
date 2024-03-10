import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { UploadResumeDto } from './dto/uploadResume.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @Body() dto: UploadResumeDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: () => 'Validation failed (expected size is less than 5mb)',
          }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.resumeService.uploadResume(file, dto.candidateId);
  }
}
