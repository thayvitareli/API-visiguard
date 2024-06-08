import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { CheckIntOutService } from './check-in-out.service';
import { UpdateCheckInOutDto } from './dto/update-check-in-out.dto';
import { CreateCheckInOutDto } from './dto/create-check-in-out.dto';

@Controller('check-in-out')
export class CheckIntOutController {
  constructor(private readonly checkInOutService: CheckIntOutService) {}

  @Post()
  create(@Body() createCheckIntOutDto: CreateCheckInOutDto) {
    return this.checkInOutService.registerCheckIn(createCheckIntOutDto);
  }

  @Get()
  findAll() {
    return this.checkInOutService.findAll();
  }

  @Patch()
  update(@Body() updateCheckInOutDto: UpdateCheckInOutDto) {
    console.log('Controller ', updateCheckInOutDto);
    return this.checkInOutService.registerCheckOut(updateCheckInOutDto);
  }
}
