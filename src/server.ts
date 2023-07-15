import * as mongoose from 'mongoose';
import config from './config';
import { app } from './app/app';

async function bootstrap(): Promise<void> {
  try {
    await mongoose.connect(config.dbUrl as string);
    console.log('Successfully connected to DB');
    app.listen(config.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log('Failed to connect DB');
  }
}

bootstrap();
