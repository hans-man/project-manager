import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateInstanceCodeDto {
  @IsString()
  @IsNotEmpty()
  instanceIdentifier: string; // 인스턴스식별자

  @IsString()
  @IsNotEmpty()
  instanceIdentifierName: string; // 인스턴스식별자명

  @IsString()
  @IsNotEmpty()
  instanceCode: string; // 인스턴스코드

  @IsString()
  @IsNotEmpty()
  instanceCodeName: string; // 인스턴스코드명

  @IsNumber()
  @IsOptional()
  queryOrder?: number; // 조회순서

  @IsString()
  @IsOptional()
  description?: string; // 설명
}
