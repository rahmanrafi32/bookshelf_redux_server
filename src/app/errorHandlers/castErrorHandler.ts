import mongoose from 'mongoose';
import { IErrorMessage } from '../../interfaces/errorMessage';

const castErrorHandler = (error: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errors: IErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ];
  return {
    message: 'Cast Error',
    statusCode,
    errorMessages: errors,
  };
};

export default castErrorHandler;
