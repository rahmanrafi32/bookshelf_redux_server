import { sendResponse } from '../../interfaces/sendResponse';
import { Response } from 'express';

const customResponse = <T>(res: Response, data: sendResponse<T>): void => {
  const responseData: sendResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default customResponse;
