import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Auth } from '@thallesp/nestjs-better-auth';
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';
import type { Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';

type SignUpEmailContext = {
  body: {
    name: string;
    email: string;
    password: string;
  };
  returnHeaders: true;
  returnStatus: true;
};

type SignUpEmailResult = {
  headers: Headers;
  response: unknown;
  status: number;
};

type AuthApi = {
  signUpEmail: (context: SignUpEmailContext) => Promise<SignUpEmailResult>;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService<Auth>) {}

  @AllowAnonymous()
  @Post('signup')
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const name = `${body.firstName} ${body.lastName}`.trim();
    const authService = this.authService as unknown as { api: AuthApi };
    const signUpEmail = authService.api.signUpEmail;
    const result = await signUpEmail({
      body: {
        name,
        email: body.email,
        password: body.password,
      },
      returnHeaders: true,
      returnStatus: true,
    });

    const setCookie = result.headers.get('set-cookie');
    if (setCookie) {
      res.setHeader('set-cookie', setCookie);
    }

    const status = typeof result.status === 'number' ? result.status : 201;
    res.status(status);
    return result.response;
  }
}
