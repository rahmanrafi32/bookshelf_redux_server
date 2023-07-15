import express, { Router } from 'express';
import { booksController } from './books.controller';

const router: Router = express.Router();

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/addBook', booksController.addBook);
router.post('/addReview/:id', booksController.addBookReview);
router.get('/reviews/:id', booksController.getBookReview);
router.delete('/:id', booksController.deleteBook);
router.patch('/:id', booksController.editBook);

export const booksRoutes = router;
