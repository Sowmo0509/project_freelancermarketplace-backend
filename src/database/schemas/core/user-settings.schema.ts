import { pgTable, uuid, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  marketingOptIn: boolean('marketing_opt_in').notNull().default(false),
  communicationPrefs: jsonb('communication_prefs'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
