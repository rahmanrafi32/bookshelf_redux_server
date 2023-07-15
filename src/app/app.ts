import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import routes from '../routes';
import globalErrorHandler from './middlewares/globlalErrorHandler';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    message: 'Server is running fine',
  });
});

app.use('/api/v1', routes);

app.use(globalErrorHandler);
