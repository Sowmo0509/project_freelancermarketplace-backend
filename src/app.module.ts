import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { auth } from './lib/auth';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
