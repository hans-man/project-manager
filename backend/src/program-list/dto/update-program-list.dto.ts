import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramListDto } from './create-program-list.dto';

export class UpdateProgramListDto extends PartialType(CreateProgramListDto) {}
