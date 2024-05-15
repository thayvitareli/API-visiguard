import { Injectable } from '@nestjs/common';
import { CreateColaboratorDto } from './dto/create-colaborator.dto';
import { UpdateColaboratorDto } from './dto/update-colaborator.dto';

@Injectable()
export class ColaboratorService {
  create(createColaboratorDto: CreateColaboratorDto) {
    return 'This action adds a new colaborator';
  }

  findAll() {
    return `This action returns all colaborator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} colaborator`;
  }

  update(id: number, updateColaboratorDto: UpdateColaboratorDto) {
    return `This action updates a #${id} colaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaborator`;
  }
}
