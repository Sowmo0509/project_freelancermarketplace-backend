import {
  pgTable,
  uuid,
  varchar,
  integer,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const education = pgTable(
  'education',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    school: varchar('school', { length: 200 }).notNull(),
    degree: varchar('degree', { length: 120 }),
    fieldOfStudy: varchar('field_of_study', { length: 120 }),
    startYear: integer('start_year'),
    endYear: integer('end_year'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdx: index('education_user_idx').on(table.userId),
  }),
);
