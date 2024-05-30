import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckIntOutService } from './check-in-out.service';
import { CreateCheckIntOutDto } from './dto/create-check-int-out.dto';
import { UpdateCheckIntOutDto } from './dto/update-check-int-out.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkIntOutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckIntOutDto: UpdateCheckIntOutDto) {
    return this.checkIntOutService.update(+id, updateCheckIntOutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkIntOutService.remove(+id);
  }
}
