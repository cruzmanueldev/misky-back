import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
const nodemailer = require('nodemailer');

@Injectable()
export class CommentsService {

  constructor(
    private prisma: PrismaService,
    private readonly whatsappService: WhatsappService
  ) {}

  async create(data) {
    const comment = await this.prisma.comment.create({
      data: {
        name: data.name,
        lastname: '',
        email: data.email,
        message: data.message,
        updated_at: new Date()
      },
    });

    let message = `Mensaje desde web\n\n` +
          `Nombre: ${data.name}\n` +
          `Correo: ${data.name}\n` +
          `Mensaje: ${data.message}`;
    
    // await this.whatsappService.sendMessage(message);

    return comment;
  }
}
