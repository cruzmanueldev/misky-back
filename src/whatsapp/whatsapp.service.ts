import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  constructor(private readonly http: HttpService) {}

  async sendMessage(message: string) {
    try{
      const meta_phone_id = process.env.FACEBOOK_PHONE_ID;
      const meta_phone = process.env.FACEBOOK_PHONE;
      const url = `https://graph.facebook.com/v22.0/${meta_phone_id}/messages`;
      const token = process.env.WHATSAPP_TOKEN;

      const body = {
        messaging_product: 'whatsapp',
        to:meta_phone,
        text: { body: message },
      };

      const response = await firstValueFrom(
        this.http.post(url, body, {
          headers: { Authorization: `${token}` },
        }),
      );
      return 'ok';
    }catch(error){
      console.log('error: ', error)
    }
  }
}