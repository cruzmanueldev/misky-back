import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';

@Module({
  imports: [HttpModule],
  providers: [TwilioService],
  exports: [TwilioService],
  controllers: [TwilioController]
})
export class TwilioModule {}
