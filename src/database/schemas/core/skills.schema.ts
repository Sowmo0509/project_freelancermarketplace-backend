import {
  pgTable,
  uuid,
  varchar,
  uniqueIndex,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';
import { skillCategories } from './skill-categories.schema';

export const skills = pgTable(
  'skills',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id').references(() => skillCategories.id, {
      onDelete: 'set null',
    }),
    name: varchar('name', { length: 120 }).notNull(),
    slug: varchar('slug', { length: 160 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('skills_slug_idx').on(table.slug),
    categoryIdx: index('skills_category_idx').on(table.categoryId),
  }),
);
