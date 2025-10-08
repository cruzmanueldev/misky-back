import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {

  private client: Twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.client = Twilio(accountSid, authToken);
  }
  
  async sendWhatsAppMessage(body: string) {
    try {
      const to = process.env.MY_PHONE_NUMBER!;
      const message = await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: to,
        body,
      });
      console.log('✅ Mensaje enviado SID:', message.sid);
      return message;
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      throw error;
    }
  }
}
