import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Auth } from '@thallesp/nestjs-better-auth';
import { AllowAnonymous, AuthService } from '@thallesp/nestjs-better-auth';
import type { Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../database/drizzle.client';
import { user } from '../database/schemas/core/auth-schema';
import { userSettings } from '../database/schemas/core/user-settings.schema';
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

    if (status < 400) {
      try {
        const [createdUser] = await db
          .select()
          .from(user)
          .where(eq(user.email, body.email))
          .limit(1);

        if (createdUser) {
          await db.transaction(async (tx) => {
            await tx
              .update(user)
              .set({
                userType: body.role === 'freelancer' ? 'freelancer' : 'client',
                country: body.country,
              })
              .where(eq(user.id, createdUser.id));

            if (typeof body.marketingOptIn === 'boolean') {
              await tx
                .insert(userSettings)
                .values({
                  userId: createdUser.id,
                  marketingOptIn: body.marketingOptIn,
                })
                .onConflictDoUpdate({
                  target: userSettings.userId,
                  set: {
                    marketingOptIn: body.marketingOptIn,
                  },
                });
            }
          });
        }
      } catch (err) {
        console.error('Failed to persist signup data', err);
      }
    }

    res.status(status);
    return result.response;
  }
}
