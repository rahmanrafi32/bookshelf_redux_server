import { IUser } from './users.interface';
import UserModel from './users.model';

import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helper/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (payload: IUser) => {
  const newUser = await UserModel.create(payload);
  return UserModel.findOne(newUser._id);
};

const loginUser = async (payload: IUser) => {
  const { username, password } = payload;
  const isUserExist = await UserModel.isUserExist(username);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { username: user } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { user },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { user },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;
//
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//
//   const { userId } = verifiedToken;
//   const isUserExist = await UserModel.isUserExist(userId);
//
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//
//   return {
//     accessToken: newAccessToken,
//   };
// };

export const usersService = {
  createUser,
  loginUser,
  // refreshToken,
};
