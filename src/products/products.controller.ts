import { Controller, Get, Query, Patch,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  
  @Get('top')
  findTopProducts() {
    return this.productsService.findTopProducts();
  }

  @Get('promotion')
  findPromotionProduct() {
    return this.productsService.findPromotionProduct();
  }

  @Patch('top')
  updateTopProducts(@Body('ids') ids: number[]) {
    return this.productsService.updateTopProducts(ids);
  }

  @Patch('promotion/:id')
  updateProductPromotion(@Param('id') id: string) {
    return this.productsService.updateProductPromotion(Number(id));
  }

  @Post('detail/:id')
  updateDetailProduct(
    @Param('id') id: string,
    @Body('details') details: String[]
  ) {
    return this.productsService.updateDetailProduct(Number(id), details);
  }

  @Get('top-selling')
  findTopSellingProducts() {
    return this.productsService.findTopSellingProducts();
  }

  @Patch('top-selling')
  updateTopSellingProducts(@Body('ids') ids: number[]) {
    return this.productsService.updateTopSellingProducts(ids);
  }

  @Get('/category')
  getProducts(@Query('category') category: number) {
    return this.productsService.findByCategory(category);
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findProduct(Number(id));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async createProduct(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const tags =
      typeof body.tags === 'string' ? JSON.parse(body.tags) : body.tags;

    return this.productsService.createProduct({
      ...body,
      image: file?.filename,
      tags, // 👈 aquí pasas tu array
    });
  }


  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products', 
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productsService.updateProduct(
      Number(id),
      body,
      file?.filename,
    );
  }
}