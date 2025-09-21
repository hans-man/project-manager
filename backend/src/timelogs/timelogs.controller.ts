import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TimelogsService } from './timelogs.service';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';

@Controller('timelogs')
export class TimelogsController {
  constructor(private readonly timelogsService: TimelogsService) {}

  @Post()
  create(@Body() createTimeLogDto: CreateTimeLogDto) {
    return this.timelogsService.create(createTimeLogDto);
  }

  @Get()
  findAll() {
    return this.timelogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeLogDto: UpdateTimeLogDto) {
    return this.timelogsService.update(+id, updateTimeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelogsService.remove(+id);
  }
}
