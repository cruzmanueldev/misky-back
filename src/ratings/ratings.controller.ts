import { Controller, Get, Query } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  findAll(@Query('page') page: string) {
    return this.ratingsService.findAll();
  }
}
