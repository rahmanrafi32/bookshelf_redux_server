import { SortOrder } from 'mongoose';

export type paginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: SortOrder;
};

export type paginationReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
