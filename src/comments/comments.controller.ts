import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body) {
    return this.commentsService.create(body);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async all() {
    return this.commentsService.all();
  }
}
