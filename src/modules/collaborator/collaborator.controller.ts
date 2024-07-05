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
import { CollaboratorService } from './collaborator.service';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { FindManyCollaboratorDto } from './dto/find-many-collaborator.dto';

@Controller('collaborator')
export class ColaboratorController {
  constructor(private readonly CollaboratorService: CollaboratorService) {}

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto, @Request() req) {
    const { userId } = req.user;
    return this.CollaboratorService.create(createColaboratorDto, userId);
  }

  @Get()
  findAll(@Query() findMany: FindManyCollaboratorDto) {
    return this.CollaboratorService.findAll(findMany);
  }
}
