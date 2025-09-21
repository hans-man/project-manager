import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { WikisService } from './wikis.service';
import { CreateWikiPageDto } from './dto/create-wiki-page.dto';
import { UpdateWikiPageDto } from './dto/update-wiki-page.dto';

@Controller('wikis')
export class WikisController {
  constructor(private readonly wikisService: WikisService) {}

  @Post()
  create(@Body() createWikiPageDto: CreateWikiPageDto) {
    return this.wikisService.create(createWikiPageDto);
  }

  @Get()
  findAll() {
    return this.wikisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWikiPageDto: UpdateWikiPageDto,
  ) {
    return this.wikisService.update(+id, updateWikiPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wikisService.remove(+id);
  }
}
