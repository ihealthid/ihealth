import { Module } from '@nestjs/common';
import { HealthcareServiceController } from './healthcare-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcareService } from './healthcare-service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthcareService])],
  controllers: [HealthcareServiceController],
})
export class HealthcareServiceModule {}
