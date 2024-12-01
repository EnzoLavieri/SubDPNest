import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/book.module';
import { User } from './users/entity/user.entity';
import { Book } from './books/entity/book.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/library-manager',
      database: 'library-manager',
      useUnifiedTopology: true,
      entities: [User, Book],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
