import BooksModel from './books.model';
import { IBook } from './books.interface';
import Books from './books.model';
import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helper/calculatePagination';

type IFilter = {
  searchTerm?: string;
  publicationYear?: number;
  genre?: string;
};

type paginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: SortOrder;
};

const searchableFields = ['title', 'author', 'genre'];
const getAllBooks = async (
  filters: IFilter,
  paginationOptions: paginationOption
) => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'publicationDate') {
          return { publicationDate: { $regex: `^${value}` } };
        } else {
          return {
            [field]: value,
          };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  return BooksModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
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
