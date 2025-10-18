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

  async update(id: number, comment: String) {

    return await this.prisma.calification.update({
      where: {
        id : id 
      },
      data: {
        comment: comment.toString()
      }
    })
  }

  async delete(id: number) {

    await this.prisma.calification.delete({
      where: {
        id : id 
      }
    })

    return 'Calificacion eliminada'; 
  }


  async create(name: String, lastname: String, comment: String) {


    let user = await this.prisma.user.findFirst({
      where : {
        name : name.toString(),
        lastname: lastname.toString(),
      }
    })

    if(!user){
      user = await this.prisma.user.create({
        data : {
          name: name.toString(),
          lastname: lastname.toString(),
          created_at: new Date()
        }
      })
    }

    const new_rating = await this.prisma.calification.create({
      data : {
        sale_id: 1,
        user_id: user.id,
        comment: comment.toString(),
        rating: 5,
        updated_at: new Date()
      }
    })

    const rating_created = await this.prisma.calification.findFirst({
      where: {
        id: new_rating.id
      },
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
    })
    return rating_created;
  }
}
