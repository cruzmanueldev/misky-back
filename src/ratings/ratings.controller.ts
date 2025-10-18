import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  findAll(@Query('page') page: string) {
    return this.ratingsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body('name') name: string,
    @Body('lastname') lastname: string,
    @Body('comment') comment: string
  ) {
    return this.ratingsService.create(name, lastname, comment);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ratingsService.delete(Number(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body('comment') comment: string) {
    return this.ratingsService.update(Number(id), comment);
  }

}
