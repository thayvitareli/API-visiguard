import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SuplierService } from './suplier.service';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import { FindManySuplierDto } from './dto/find-many-suplier-dto';

@Controller('suplier')
export class SuplierController {
  constructor(private readonly suplierService: SuplierService) {}

  @Post()
  create(@Body() createSuplierDto: CreateSuplierDto) {
    return this.suplierService.create(createSuplierDto);
  }

  @Get()
  findAll(@Query() findMany: FindManySuplierDto) {
    return this.suplierService.findAll(findMany);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suplierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuplierDto: UpdateSuplierDto) {
    return this.suplierService.update(+id, updateSuplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suplierService.remove(+id);
  }
}
