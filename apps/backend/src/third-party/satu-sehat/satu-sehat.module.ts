import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SatuSehatService } from './satu-sehat.service';
import { SatuSehatController } from './satu-sehat.conroller';

@Module({
  imports: [HttpModule],
  providers: [SatuSehatService],
  controllers: [SatuSehatController],
})
export class SatuSehatModule {}
