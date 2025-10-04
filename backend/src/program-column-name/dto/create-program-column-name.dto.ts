import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateProgramColumnNameDto {
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  columnId: string;

  @IsString()
  @IsNotEmpty()
  columnName: string;

  @IsObject()
  @IsOptional()
  tableConfig?: object;
}
