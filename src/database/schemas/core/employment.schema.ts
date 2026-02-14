import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const employment = pgTable(
  'employment',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    company: varchar('company', { length: 200 }).notNull(),
    title: varchar('title', { length: 160 }).notNull(),
    startDate: timestamp('start_date', { withTimezone: true }),
    endDate: timestamp('end_date', { withTimezone: true }),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('employment_user_idx').on(table.userId)],
);
