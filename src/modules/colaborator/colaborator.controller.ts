import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ColaboratorService } from './colaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';

@Controller('collaborator')
export class ColaboratorController {
  constructor(private readonly colaboratorService: ColaboratorService) {}

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto, @Request() req) {
    const { userId } = req.user;
    return this.colaboratorService.create(createColaboratorDto, userId);
  }

  @Get()
  findAll(@Query() findMany: FindManyCollaboratorDto) {
    return this.colaboratorService.findAll(findMany);
  }
}
