import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class SalesService {
  
  constructor(
    private prisma: PrismaService,
    private readonly twilioService: TwilioService
  ) {}

  async create(sale: any) {

    let user: any;

    user = await this.prisma.user.findFirst({
      where : {
        phone : sale.customer.phone
      }
    })

    if(!user){
      user = await this.prisma.user.create({
        data: {
          phone: sale.customer.phone,
          name: sale.customer.name
        }
      })
    }

    let message = `Nombre: ${sale.customer.name}\n` +
                `Teléfono: ${sale.customer.phone}\n\n` +
                `Pedido:\n`;

    let amount_final: number = 0;

    for (const item of sale.items) {
      const product = await this.prisma.product.findFirst({
        where: { id: item.product_id },
      });

      if (product) {
        amount_final += Number(product.price) * item.quantity;
      }
    }

    const new_sale = await this.prisma.sale.create({
      data: {
        user_id: user.id,
        amount: sale.total,
        amount_final: amount_final,
        updated_at: new Date()
      }
    })

    for (const item of sale.items) {

      const product = await this.prisma.product.findFirst({
        where: { id: item.product_id },
      });

      if(product){
        const subtotal = `${(Number(product.price) * item.quantity).toFixed(2)}€`;
  
        if(product){
          await this.prisma.detail_sale.create({
            data: {
              sale_id: new_sale.id,
              product_id: product.id,
              selling_price: Number(product.price),
              quantity: item.quantity
            },
          });
          message += `(${item.quantity}) ${product.name}: ${subtotal}\n`;
        }
      }
    }

    message += `\nTotal: ${amount_final.toFixed(2)}€`;
    console.log(message);

    await this.twilioService.sendWhatsAppMessage(message);

    return {
      status: 200,
      message: 'Orden generada',
    };
  }

  async lastSales() {

    const sales = await this.prisma.sale.findMany({
      select : {
        user :{ 
          select : {
            name: true,
          }
        },
        detail_sale:{
          select:{
            product:{
              select:{
                name:true
              }
            }
          }
        },
        created_at: true,
        amount: true,
      },
      orderBy: {
        id: 'desc'
      },
      take: 5
    });

    const response = sales.map(sale => ({
      nombre: sale.user?.name ?? null,
      productos: sale.detail_sale.map(d => d.product.name),
      precio: `${sale.amount}€`, 
      fecha: new Date(sale.created_at).toLocaleDateString('es-ES')
    }));

    return response;
  }
}
