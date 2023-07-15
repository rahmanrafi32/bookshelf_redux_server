import asyncTryCatch from '../../shared/asyncTryCatch';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { usersService } from './users.service';
import config from '../../../config';
import { IUser } from './users.interface';

const createUser = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const result: IUser | null = await usersService.createUser(req.body);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

const loginUser = asyncTryCatch(
  async (req: Request, res: Response): Promise<void> => {
    const { ...loginData } = req.body;
    const result = await usersService.loginUser(loginData);
    const { refreshToken, ...response } = result;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    customResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: response,
    });
  }
);

// const refreshToken = asyncTryCatch(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await usersService.refreshToken(refreshToken);
//
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };
//
//   res.cookie('refreshToken', refreshToken, cookieOptions);
//
//   customResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'New access token generated successfully !',
//     data: result,
//   });
// });

export const userController = {
  createUser,
  loginUser,
  // refreshToken,
};
