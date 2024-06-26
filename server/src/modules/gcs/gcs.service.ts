import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class GcsService {
  private storage: Storage;

  constructor(private config: ConfigService) {
    this.storage = new Storage({
      projectId: config.get('GCS_PROJECT_ID'),
      credentials: {
        client_email: config.get('GCS_CLIENT_EMAIL'),
        private_key: config.get('GCS_PRIVATE_KEY'),
      },
    });
  }

  async uploadFile(fileName: string, buffer: Buffer) {
    const bucket = this.storage.bucket(this.config.get('GCS_STORAGE_MEDIA_BUCKET'));
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({ resumable: false });

    stream.on('finish', () => {
      console.log(`File ${fileName} uploaded successfully.`);
    });
    stream.end(buffer);
  }
}
