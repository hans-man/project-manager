import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ProgramListService } from './program-list.service';
import { CreateProgramListDto } from './dto/create-program-list.dto';
import { UpdateProgramListDto } from './dto/update-program-list.dto';

@Controller('program-list')
export class ProgramListController {
  constructor(private readonly programListService: ProgramListService) {}

  @Post()
  create(@Body() createProgramListDto: CreateProgramListDto) {
    return this.programListService.create(createProgramListDto);
  }

  @Get()
  findAll() {
    return this.programListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramListDto: UpdateProgramListDto) {
    return this.programListService.update(+id, updateProgramListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programListService.remove(+id);
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file || file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: '엑셀 파일만 업로드할 수 있습니다.' });
    }
    try {
      const result = await this.programListService.bulkUpload(file.buffer);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '파일 처리 중 오류가 발생했습니다.', error: error.message });
    }
  }

  @Get('template')
  async downloadTemplate(@Res() res: Response) {
    try {
      const excelBuffer = this.programListService.generateExcelTemplate();
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="program_list_template.xlsx"',
      });
      res.send(excelBuffer);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '템플릿 생성 중 오류가 발생했습니다.', error: error.message });
    }
  }
}
