import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Login ID must be at least 8 characters long' })
  loginId?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsOptional()
  @IsString()
  userTypeCode?: string;

  @IsOptional()
  @IsString()
  departmentCode?: string;

  @IsOptional()
  @IsString()
  positionCode?: string;

  @IsOptional()
  @IsString()
  roleCode?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  hireDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  resignationDate?: Date;
}
