import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

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
            image: true,
            units: true,
            category_id: true,
            detailpack : {
              select : {
                name : true
              }
            }
          },
        },
      },
    })
  }

  findTopProducts() {
    return this.prisma.product.findMany({
      take: 8,
      select: {
        id: true,
          name: true,
          price: true,
          description: true,
          order: true,
          image: true,
          units: true,
          category_id: true,
          detailpack : {
            select : {
              name : true
            }
          }
      },
    });
  }

  findByCategory(category_id: number) {
    return this.prisma.category.findMany({
      where: {
        id: Number(category_id)
      },
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
            image: true,
            units: true,
            category_id: true,
            detailpack : {
              select : {
                name : true
              }
            }
          },
        },
      },
    })
  }

  async updateProduct(id: number, data: any, imageName?: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Producto no encontrado');

    const updateData: any = {
      name: data.name ?? existing.name,
      price: data.price ? Number(data.price) : existing.price,
      description: data.description ?? existing.description,
      order: data.order ?? existing.order,
      units: data.units ?? existing.units,
    };

    if (imageName) {
      updateData.image = `/uploads/products/${imageName}`;
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }
}
