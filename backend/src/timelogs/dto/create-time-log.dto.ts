import { IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTimeLogDto {
  @IsNumber()
  @IsNotEmpty()
  hours: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  taskId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
