import { Controller,  Post, Body } from '@nestjs/common';
import { CultureContaynedHistoryService } from './culture-contayned-history.service';
import { CreateCultureContaynedHistoryDto } from './dto/create-culture-contayned-history.dto';

// @Controller('culture-contayned-history')
// export class CultureContaynedHistoryController {
//   constructor(private readonly cultureContaynedHistoryService: CultureContaynedHistoryService) {}
//
//   @Post()
//   create(@Body() createCultureContaynedHistoryDto: CreateCultureContaynedHistoryDto) {
//     return this.cultureContaynedHistoryService.create(createCultureContaynedHistoryDto);
//   }
// }
