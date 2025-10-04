import { PartialType } from '@nestjs/mapped-types';
import { CreateInstanceCodeDto } from './create-instance-code.dto';

export class UpdateInstanceCodeDto extends PartialType(CreateInstanceCodeDto) {}
