import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports:[WhatsappModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService]
})
export class CommentsModule {}
