import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  json,
  urlencoded,
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });
  const frontendURL = process.env.FRONTEND_URL ?? 'http://localhost:3000';

  app.enableCors({
    origin: frontendURL,
    credentials: true,
  });

  const jsonParser: RequestHandler = json();
  const urlencodedParser: RequestHandler = urlencoded({ extended: true });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith('/api/auth')) {
      return next();
    }
    return jsonParser(req, res, next);
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith('/api/auth')) {
      return next();
    }
    return urlencodedParser(req, res, next);
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
