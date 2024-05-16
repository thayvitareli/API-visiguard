import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';

@Controller('colaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService) {}

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto) {
    return this.colaboratorService.create(createColaboratorDto);
  }

  @Get()
  findAll(@Query() findMany: FindManyCollaboratorDto) {
    return this.colaboratorService.findAll(findMany);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colaboratorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColaboratorDto: UpdateColaboratorDto,
  ) {
    return this.colaboratorService.update(+id, updateColaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colaboratorService.remove(+id);
  }
}
