import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWikiPageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
