import { Controller, Get, Query } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController {

  constructor(private readonly twilioService: TwilioService) {}

  // @Get('send')
  // async sendMessage(@Query('msg') msg: string) {
  //   const to = process.env.MY_PHONE_NUMBER!;
  //   return this.twilioService.sendWhatsAppMessage(msg || 'Nuevo pedido');
  // }
}
