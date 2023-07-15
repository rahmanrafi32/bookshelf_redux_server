import { Model } from 'mongoose';

export type IUser = {
  username: string;
  password: string;
};

export type IUserModel = {
  isUserExist(id: string): Promise<Partial<IUser>>;
  isPasswordMatched(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;

export type IRefreshTokenResponse = {
  accessToken: string;
};
