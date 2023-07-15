import BooksModel from './books.model';
import { IBook } from './books.interface';
import Books from './books.model';
// import { SortOrder } from 'mongoose';
// import calculatePagination from '../../../helper/calculatePagination';

// type IFilter = {
//   publicationYear: number;
//   genre: string;
// };
//
// type paginationOption = {
//   page?: number;
//   limit?: number;
//   sortBy?: string | undefined;
//   sortOrder?: SortOrder;
// };
// const getAllBooks = async (
//   filters: Partial<IFilter>,
//   paginationOptions: paginationOption
// ) => {
//   const { limit, skip } = calculatePagination(paginationOptions);
//
//   const { ...filtersData } = filters;
//   const andConditions = [];
//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};
//   return BooksModel.find(whereConditions).skip(skip).limit(limit);
// };

const getAllBooks = async () => {
  return BooksModel.find();
};

const getBookById = (id: string) => {
  return BooksModel.findById({ _id: id });
};

const addBook = async (payload: IBook) => {
  const book = new Books(payload);
  await book.save();
};

const addBookReview = (id: string, reviews: string) => {
  return BooksModel.findOneAndUpdate({ _id: id }, { $push: { reviews } });
};

const getBookReview = (id: string) => {
  return BooksModel.findById({ _id: id }, { _id: 0, reviews: 1 });
};

const deleteBook = (id: string) => {
  return BooksModel.findOneAndDelete({ _id: id });
};

const editBook = (id: string, editData: IBook) => {
  console.log(editData);
  return BooksModel.findOneAndUpdate({ _id: id }, editData, { new: true });
};

export const booksService = {
  getAllBooks,
  addBook,
  getBookById,
  addBookReview,
  getBookReview,
  deleteBook,
  editBook,
};
