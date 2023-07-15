import { ErrorRequestHandler, NextFunction } from 'express';
import { IErrorMessage } from '../../interfaces/errorMessage';
import validationErrorHandler from '../errorHandlers/validationErrorHandler';
import config from '../../config';
import ApiError from '../errorHandlers/ApiError';
import castErrorHandler from '../errorHandlers/castErrorHandler';
import zodErrorHandler from '../errorHandlers/zodErrorHandler';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: IErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const validationError = validationErrorHandler(error);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessages = validationError.errorMessages;
  } else if (error instanceof ZodError) {
    const zodError = zodErrorHandler(error);
    statusCode = zodError?.statusCode;
    message = zodError?.message;
    errorMessages = zodError?.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  } else if (error?.name === 'CastError') {
    const castError = castErrorHandler(error);
    statusCode = castError?.statusCode;
    message = castError?.message;
    errorMessages = castError?.message
      ? [
          {
            path: 'CastError',
            message: castError.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
