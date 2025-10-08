import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {

  constructor(private readonly whatsappService: WhatsappService) {}
  
  @Post('send')
  async sendMessage(@Body() body: { message: string }) {
    return this.whatsappService.sendMessage(body.message);
  }
}
