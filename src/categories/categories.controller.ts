import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {}
  
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findCategories() {
    return this.categoriesService.findCategories();
  }

  @UseGuards(AuthGuard)
  @Patch('')
  updateCategory(@Body('id') id: number, @Body('name') name: string) {
    return this.categoriesService.updateCategory(id, name);
  }
}
