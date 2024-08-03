import { PartialType } from '@nestjs/swagger';
import { CreateCultureContaynedHistoryDto } from './create-culture-contayned-history.dto';

export class UpdateCultureContaynedHistoryDto extends PartialType(CreateCultureContaynedHistoryDto) {}
