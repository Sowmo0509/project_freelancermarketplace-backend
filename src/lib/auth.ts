import { ModuleRef } from '@nestjs/core';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from '../database/schemas/core/auth-schema';
import { db } from '../database/drizzle.client';
import { MailQueue } from '../modules/mail/mail.queue';

export const auth = (moduleRef: ModuleRef) => {
  const mailQueue = moduleRef.get(MailQueue, { strict: false });

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    trustedOrigins: [process.env.FRONTEND_URL!, process.env.BETTER_AUTH_URL!],
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: authSchema,
    }),
    advanced: {
      database: {
        generateId: 'uuid',
      },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      autoSignIn: true,
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }, request) => {
        try {
          // ensure this returns a promise
          await mailQueue.addEmailJob({
            to: user.email,
            subject: 'Verify your email address',
            html: `<p>Click to verify your email:</p><a href="${url}">${url}</a>`,
          });
        } catch (err) {
          console.error('Failed to enqueue verification email', err);
        }
      },
    },
  });
};
