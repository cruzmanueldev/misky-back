import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        order: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            order: true,
            units: true,
            category_id: true
          },
        },
      },
    })
  }
}
