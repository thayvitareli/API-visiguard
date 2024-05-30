import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckIntOutDto } from './create-check-int-out.dto';

export class UpdateCheckIntOutDto extends PartialType(CreateCheckIntOutDto) {}
