import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { TwilioModule } from 'src/twilio/twilio.module';

@Module({
  imports:[WhatsappModule, TwilioModule],
  providers: [SalesService, PrismaService],
  controllers: [SalesController]
})
export class SalesModule {}
