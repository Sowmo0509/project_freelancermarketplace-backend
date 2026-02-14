import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { reviewVisibilityEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { contracts } from '../marketplace/contracts.schema';

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    reviewerId: uuid('reviewer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    revieweeId: uuid('reviewee_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    visibility: reviewVisibilityEnum('visibility').notNull().default('public'),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    recommend: boolean('recommend'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('reviews_contract_idx').on(table.contractId),
    index('reviews_reviewer_idx').on(table.reviewerId),
    index('reviews_reviewee_idx').on(table.revieweeId),
  ],
);
