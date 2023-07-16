import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { booksService } from './books.service';
import pick from '../../shared/pick';

const filterAbleFields = ['searchTerm', 'publicationDate', 'genre'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

const getAllBooks = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, filterAbleFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await booksService.getAllBooks(filters, paginationOptions);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const getBookById = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const result = await booksService.getBookById(req.params.id);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const addBook = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    await booksService.addBook(req.body);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added successfully',
    });
  }
);

const addBookReview = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    await booksService.addBookReview(req.params.id, req.body.reviews);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review added successfully',
    });
  }
);

const getBookReview = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const result = await booksService.getBookReview(req.params.id);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
  }
);

const deleteBook = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    await booksService.deleteBook(req.params.id);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Deleted book successfully',
    });
  }
);

const editBook = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    await booksService.editBook(req.params.id, req.body);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Updated book successfully',
    });
  }
);

export const booksController = {
  getAllBooks,
  addBook,
  getBookById,
  addBookReview,
  getBookReview,
  deleteBook,
  editBook,
};
