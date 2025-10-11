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
            detail:true,
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

  findProduct(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
          name: true,
          price: true,
          description: true,
          detail:true,
          order: true,
          image: true,
          units: true,
          category_id: true,
          detailpack : {
            select : {
              id: true,
              name : true
            }
          }
      },
    });
  }

  findTopProducts() {
    return this.prisma.product.findMany({
      // where: {
      //   show_in_carrousel: true
      // },
      where : {
        id: {
          in : [ 7 , 15, 35, 9, 41, 2,  21, 8]
        }
      },
      take: 8,
      select: {
        id: true,
          name: true,
          price: true,
          description: true,
          detail:true,
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

  findPromotionProduct() {
    return this.prisma.product.findFirst({
      where: {
        active_promotion: true
      },
      select: {
        id: true,
          name: true,
          price: true,
          description: true,
          detail:true,
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

  async updateProductPromotion(id: number) {

    await this.prisma.product.updateMany({
      data: { show_in_carrousel: false },
    });

    return this.prisma.product.update({
      where: { id },
      data: {
        active_promotion: true,
      },
    });

  }

  async updateDetailProduct(id: Number, details: String[]) {

    await this.prisma.detailpack.deleteMany({
      where : {
        product_id : Number(id),
      },
    });

    const detail_product = details.map((detail: string) => ({ 
      name: detail, 
      product_id: Number(id),
      updated_at: new Date() 
    }));
    
    const detail = await this.prisma.detailpack.createMany({
      data : detail_product
    })
  }

  async updateTopProducts(ids: number[]) {
    await this.prisma.product.updateMany({
      data: { show_in_carrousel: false },
    });

    if (ids && ids.length > 0) {
      await this.prisma.product.updateMany({
        where: { id: { in: ids } },
        data: { show_in_carrousel: true },
      });
    }

    return this.prisma.product.findMany({
      where: { show_in_carrousel: true },
    });
  }

  async updateTopSellingProducts(ids: number[]) {
    await this.prisma.product.updateMany({
      data: { best_seller: false },
    });

    if (ids && ids.length > 0) {
      await this.prisma.product.updateMany({
        where: { id: { in: ids } },
        data: { best_seller: true },
      });
    }

    return this.prisma.product.findMany({
      where: { best_seller: true },
    });
  }

  findTopSellingProducts() {
    return this.prisma.product.findMany({
      where : {
        id: {
          in : [ 7 , 15, 35, 9, 41, 2,  21, 8]
        }
      },
      // take: 8,
      select: {
        id: true,
          name: true,
          price: true,
          description: true,
          detail:true,
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
            detail:true,
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

  async createProduct(data: any) {

    const { 
      name, 
      price, 
      image,
      description,
      detail,
      description_carrousel, 
      category_id,
      units,
    } = data;

    const product = await this.prisma.product.create({
      data: {
        name,
        price: Number(price),
        image,
        detail,
        description,
        units: Number(units),
        description_carrousel,
        category_id: Number(category_id),
        updated_at: new Date(),
      },
    });
    
    return product;
  }



  async updateProduct(id: number, data: any, imageName?: string) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Producto no encontrado');

    const updateData: any = {
      name: data.name ?? existing.name,
      price: data.price ? Number(data.price) : existing.price,
      description: data.description ?? existing.description,
      order: data.order ?? existing.order,
      detail: data.detail ?? existing.detail,
      units: data.units ?? existing.units,
      category_id: data.category_id ? Number(data.category_id) : existing.category_id,
      description_carrousel: data.description_carrousel ?? existing.description_carrousel,
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
