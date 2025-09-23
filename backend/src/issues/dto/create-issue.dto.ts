import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  taskName?: string;

  @IsString()
  @IsOptional()
  testClassification?: string;

  @IsNumber()
  @IsOptional()
  testRound?: number;

  @IsString()
  @IsOptional()
  programId?: string;

  @IsString()
  @IsOptional()
  programName?: string;

  @IsString()
  @IsOptional()
  programDescription?: string;

  @IsString()
  @IsOptional()
  assigneeName?: string;

  @IsDateString()
  @IsOptional()
  developmentDueDate?: Date;

  @IsDateString()
  @IsOptional()
  developmentCompletionDate?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  managerName?: string;

  @IsDateString()
  @IsOptional()
  managerReviewCompletionDate?: Date;

  @IsString()
  @IsOptional()
  businessOwnerName?: string;

  @IsDateString()
  @IsOptional()
  businessOwnerReviewCompletionDate?: Date;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;
}