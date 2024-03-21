import { PartialType } from '@nestjs/mapped-types';
import { CreateIfieldPerimetrDto } from './create-ifield-perimetr.dto';

export class UpdateIfieldPerimetrDto extends PartialType(CreateIfieldPerimetrDto) {}
