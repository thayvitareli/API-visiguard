import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { CheckIntOutService } from './check-in-out.service';
import { UpdateCheckInOutDto } from './dto/update-check-in-out.dto';
import { CreateCheckInOutDto } from './dto/create-check-in-out.dto';
import { FindManyCheckDto } from './dto/find-many-check.dto';

@Controller('check-in-out')
export class CheckIntOutController {
  constructor(private readonly checkInOutService: CheckIntOutService) {}

  @Post()
  create(@Body() createCheckIntOutDto: CreateCheckInOutDto) {
    return this.checkInOutService.registerCheckIn(createCheckIntOutDto);
  }

  @Get()
  findAll(@Query() findMany: FindManyCheckDto) {
    return this.checkInOutService.findAll(findMany);
  }

  @Patch()
  update(@Body() updateCheckInOutDto: UpdateCheckInOutDto) {
    return this.checkInOutService.registerCheckOut(updateCheckInOutDto);
  }
}
