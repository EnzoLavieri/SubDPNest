import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepo: Repository<Book>) {}

  async create(book: Book): Promise<Book> {
    return this.booksRepo.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepo.find();
  }

  async findOne(id: string): Promise<Book> {
    return this.booksRepo.findOneBy({ _id: new ObjectId(id) });
  }

  async update(id: string, book: Partial<Book>): Promise<void> {
    await this.booksRepo.update({ _id: new ObjectId(id) }, book);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepo.delete({ _id: new ObjectId(id) });
  }
}
