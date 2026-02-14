import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { organizationTypeEnum } from '../enums.schema';
import { users } from './users.schema';

export const organizations = pgTable(
  'organizations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ownerUserId: uuid('owner_user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 160 }).notNull(),
    type: organizationTypeEnum('type').notNull().default('client'),
    description: text('description'),
    websiteUrl: varchar('website_url', { length: 320 }),
    industry: varchar('industry', { length: 120 }),
    sizeMin: integer('size_min'),
    sizeMax: integer('size_max'),
    countryCode: varchar('country_code', { length: 2 }),
    timezone: varchar('timezone', { length: 64 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('organizations_slug_idx').on(table.slug),
    index('organizations_owner_idx').on(table.ownerUserId),
  ],
);
