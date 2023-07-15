import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserZodSchema } from './users.validation';
import { userController } from './users.controller';

const router: Router = express.Router();

router.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  userController.createUser
);

router.post(
  '/login',
  validateRequest(createUserZodSchema),
  userController.loginUser
);

export const userRoutes = router;
