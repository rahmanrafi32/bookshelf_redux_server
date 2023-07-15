import { ZodError, ZodIssue } from 'zod';
import { IErrorMessage } from '../../interfaces/errorMessage';

const zodErrorHandler = (error: ZodError) => {
  const statusCode = 400;
  const errors: IErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: 'Internal Server Error',
    errorMessages: errors,
  };
};

export default zodErrorHandler;
