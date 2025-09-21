import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CostentriesService } from './costentries.service';
import { CreateCostEntryDto } from './dto/create-cost-entry.dto';
import { UpdateCostEntryDto } from './dto/update-cost-entry.dto';

@Controller('costentries')
export class CostentriesController {
  constructor(private readonly costentriesService: CostentriesService) {}

  @Post()
  create(@Body() createCostEntryDto: CreateCostEntryDto) {
    return this.costentriesService.create(createCostEntryDto);
  }

  @Get()
  findAll() {
    return this.costentriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costentriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCostEntryDto: UpdateCostEntryDto,
  ) {
    return this.costentriesService.update(+id, updateCostEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costentriesService.remove(+id);
  }
}
