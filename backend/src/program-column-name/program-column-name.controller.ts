import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramColumnNameService } from './program-column-name.service';
import { CreateProgramColumnNameDto } from './dto/create-program-column-name.dto';
import { UpdateProgramColumnNameDto } from './dto/update-program-column-name.dto';

@Controller('program-column-name')
export class ProgramColumnNameController {
  constructor(private readonly programColumnNameService: ProgramColumnNameService) {}

  @Post()
  create(@Body() createProgramColumnNameDto: CreateProgramColumnNameDto) {
    return this.programColumnNameService.create(createProgramColumnNameDto);
  }

  @Get()
  findAll() {
    return this.programColumnNameService.findAll();
  }

  @Get(':projectId/:columnId')
  findOne(@Param('projectId') projectId: string, @Param('columnId') columnId: string) {
    return this.programColumnNameService.findOne(+projectId, columnId);
  }

  @Patch(':projectId/:columnId')
  update(
    @Param('projectId') projectId: string,
    @Param('columnId') columnId: string,
    @Body() updateProgramColumnNameDto: UpdateProgramColumnNameDto,
  ) {
    return this.programColumnNameService.update(+projectId, columnId, updateProgramColumnNameDto);
  }

  @Delete(':projectId/:columnId')
  remove(@Param('projectId') projectId: string, @Param('columnId') columnId: string) {
    return this.programColumnNameService.remove(+projectId, columnId);
  }
}
