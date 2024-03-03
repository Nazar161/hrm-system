import { registerEnumType } from '@nestjs/graphql';

export enum ResumeFormat {
  DOCX = 'DOCX',
  PDF = 'PDF',
}

registerEnumType(ResumeFormat, {
  name: 'ResumeFormat',
});
