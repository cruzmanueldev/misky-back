import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingsService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.calification.findMany({
      orderBy: { created_at: 'desc' },
      select : {
        id: true,
        comment: true,
        created_at: true,
        user : {
          select : {
            name: true,
            lastname: true,
          }
        }
      }
    });
  }
}
