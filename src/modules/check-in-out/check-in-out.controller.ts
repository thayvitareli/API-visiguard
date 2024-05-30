import { Controller, Get, Post, Body } from '@nestjs/common';
import { CheckIntOutService } from './check-in-out.service';
import { CreateCheckIntOutDto } from './dto/create-check-int-out.dto';

@Controller('check-in-out')
export class CheckIntOutController {
  constructor(private readonly checkIntOutService: CheckIntOutService) {}

  @Post()
  create(@Body() createCheckIntOutDto: CreateCheckIntOutDto) {
    return this.checkIntOutService.create(createCheckIntOutDto);
  }

  @Get()
  findAll() {
    return this.checkIntOutService.findAll();
  }
}
