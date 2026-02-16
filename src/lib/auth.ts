import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from '../database/schemas/core/auth-schema';
import { db } from '../database/drizzle.client';

const baseURL = process.env.BETTER_AUTH_URL ?? 'http://localhost:4000';
const frontendURL = process.env.FRONTEND_URL ?? 'http://localhost:3000';

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [frontendURL, baseURL],
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
  },
});
