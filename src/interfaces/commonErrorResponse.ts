import { IErrorMessage } from './errorMessage';

export type ICommonErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
