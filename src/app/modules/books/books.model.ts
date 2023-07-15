import { model, Schema } from 'mongoose';
import { IBook } from './books.interface';

const BooksSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
    },
    publicationDate: {
      type: String,
      require: true,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

const Books = model<IBook>('Book', BooksSchema);

export default Books;
