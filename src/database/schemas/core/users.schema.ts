import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { userTypeEnum, userStatusEnum } from '../enums.schema';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 320 }).notNull(),
    username: varchar('username', { length: 50 }),
    passwordHash: text('password_hash').notNull(),
    userType: userTypeEnum('user_type').notNull().default('both'),
    status: userStatusEnum('status').notNull().default('pending'),
    phoneE164: varchar('phone_e164', { length: 20 }),
    countryCode: varchar('country_code', { length: 2 }),
    timezone: varchar('timezone', { length: 64 }),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('users_email_idx').on(table.email),
    uniqueIndex('users_username_idx').on(table.username),
    index('users_status_idx').on(table.status),
  ],
);
