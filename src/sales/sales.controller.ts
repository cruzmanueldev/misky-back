import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() sale: any) {
    return this.salesService.create(sale);
  }
}
