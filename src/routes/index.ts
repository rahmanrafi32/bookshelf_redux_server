import express, { Router } from 'express';
import { routesMap } from '../interfaces/routesMap';
import { userRoutes } from '../app/modules/users/users.routes';
import { booksRoutes } from '../app/modules/books/books.routes';

const router: Router = express.Router();

const moduleRoutes: routesMap[] = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
];

moduleRoutes.forEach((route: routesMap): void => {
  router.use(route.path, route.route);
});

export default router;
