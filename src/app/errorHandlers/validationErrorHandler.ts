import mongoose from 'mongoose';

import { ICommonErrorResponse } from '../../interfaces/commonErrorResponse';
import { IErrorMessage } from '../../interfaces/errorMessage';

const validationErrorHandler = (
  err: mongoose.Error.ValidationError
): ICommonErrorResponse => {
  const errors: IErrorMessage[] = Object.values(err.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    message: 'Validation Error',
    statusCode,
    errorMessages: errors,
  };
};

export default validationErrorHandler;
