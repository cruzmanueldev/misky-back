import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { SalesModule } from './sales/sales.module';
import { TwilioModule } from './twilio/twilio.module';

@Module({
  imports: [PrismaModule, WhatsappModule, ProductsModule, CategoriesModule, RatingsModule, CommentsModule, SalesModule, TwilioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
