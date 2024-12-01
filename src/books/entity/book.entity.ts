import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publishedYear: number;
}
