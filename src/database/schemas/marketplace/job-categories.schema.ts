import {
  pgTable,
  uuid,
  varchar,
  uniqueIndex,
  index,
  foreignKey,
  timestamp,
} from 'drizzle-orm/pg-core';

export const jobCategories = pgTable(
  'job_categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    parentId: uuid('parent_id'),
    name: varchar('name', { length: 120 }).notNull(),
    slug: varchar('slug', { length: 160 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('job_categories_slug_idx').on(table.slug),
    index('job_categories_parent_idx').on(table.parentId),
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete('set null'),
  ],
);
