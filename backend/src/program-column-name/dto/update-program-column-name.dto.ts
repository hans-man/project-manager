import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramColumnNameDto } from './create-program-column-name.dto';

export class UpdateProgramColumnNameDto extends PartialType(CreateProgramColumnNameDto) {}
