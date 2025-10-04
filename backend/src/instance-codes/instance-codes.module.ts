import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceCodesService } from './instance-codes.service';
import { InstanceCodesController } from './instance-codes.controller';
import { InstanceCode } from '../entities/instance-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceCode])],
  providers: [InstanceCodesService],
  controllers: [InstanceCodesController],
})
export class InstanceCodesModule {}
