import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { auth } from './lib/auth';
import { BullModule } from '@nestjs/bullmq';
import { MailQueue } from './modules/mail/mail.queue';

@Module({
  imports: [
    AuthModule.forRootAsync({
      inject: [ModuleRef],
      useFactory: (moduleRef: ModuleRef) => ({
        auth: auth(moduleRef),
      }),
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT) ?? 6379,
      },
    }),
    BullModule.registerQueue({ name: 'emails' }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, MailQueue],
})
export class AppModule {}
