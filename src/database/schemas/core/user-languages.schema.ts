import {
  pgTable,
  uuid,
  varchar,
  boolean,
  uniqueIndex,
  timestamp,
} from 'drizzle-orm/pg-core';
import { languageProficiencyEnum } from '../enums.schema';
import { users } from './users.schema';

export const userLanguages = pgTable(
  'user_languages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    languageCode: varchar('language_code', { length: 10 }).notNull(),
    proficiency: languageProficiencyEnum('proficiency').notNull(),
    isPrimary: boolean('is_primary').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('user_languages_unique_idx').on(
      table.userId,
      table.languageCode,
    ),
  ],
);
