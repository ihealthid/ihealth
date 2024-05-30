import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private client: Client;
  constructor() {
    if (!this.client) {
      this.client = new Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY,
      });
    }
  }

  async get(filename: string) {
    const stream = await this.client.getObject(
      process.env.MINIO_BUCKET,
      filename,
    );
    return new Promise<Buffer>((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      stream.on('error', (err) => {
        reject(err.message);
      });
      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}
