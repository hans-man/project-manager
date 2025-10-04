import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

import { InstanceCodesService } from './instance-codes.service';
import { CreateInstanceCodeDto } from './dto/create-instance-code.dto';
import { UpdateInstanceCodeDto } from './dto/update-instance-code.dto';

@Controller('instance-codes')
export class InstanceCodesController {
  constructor(private readonly instanceCodesService: InstanceCodesService) {}

  @Post()
  create(@Body() createInstanceCodeDto: CreateInstanceCodeDto) {
    return this.instanceCodesService.create(createInstanceCodeDto);
  }

  @Get()
  findAll() {
    return this.instanceCodesService.findAll();
  }

  @Get(':instanceIdentifier/:instanceCode')
  findOne(@Param('instanceIdentifier') instanceIdentifier: string, @Param('instanceCode') instanceCode: string) {
    return this.instanceCodesService.findOne(instanceIdentifier, instanceCode);
  }

  @Put(':instanceIdentifier/:instanceCode')
  update(
    @Param('instanceIdentifier') instanceIdentifier: string,
    @Param('instanceCode') instanceCode: string,
    @Body() updateInstanceCodeDto: UpdateInstanceCodeDto,
  ) {
    return this.instanceCodesService.update(instanceIdentifier, instanceCode, updateInstanceCodeDto);
  }

  @Delete(':instanceIdentifier/:instanceCode')
  remove(@Param('instanceIdentifier') instanceIdentifier: string, @Param('instanceCode') instanceCode: string) {
    return this.instanceCodesService.remove(instanceIdentifier, instanceCode);
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file || file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: '엑셀 파일만 업로드할 수 있습니다.' });
    }
    try {
      const result = await this.instanceCodesService.bulkUpload(file.buffer);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '파일 처리 중 오류가 발생했습니다.', error: error.message });
    }
  }

  @Get('template')
  async downloadTemplate(@Res() res: Response) {
    try {
      const excelBuffer = this.instanceCodesService.generateExcelTemplate();
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="instance_code_template.xlsx"',
      });
      res.send(excelBuffer);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '템플릿 생성 중 오류가 발생했습니다.', error: error.message });
    }
  }
}
