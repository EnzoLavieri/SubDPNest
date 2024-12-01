import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CacheModule.register()],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
