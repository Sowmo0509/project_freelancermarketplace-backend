import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { auth } from './lib/auth';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT) ?? 6379,
      },
    }),
    BullModule.registerQueue({ name: 'emails' }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
