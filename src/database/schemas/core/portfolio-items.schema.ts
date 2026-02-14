import { pgTable, uuid, integer, index, timestamp } from 'drizzle-orm/pg-core';
import { portfolios } from './portfolios.schema';
import { attachments } from './attachments.schema';

export const portfolioItems = pgTable(
  'portfolio_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    portfolioId: uuid('portfolio_id')
      .notNull()
      .references(() => portfolios.id, { onDelete: 'cascade' }),
    attachmentId: uuid('attachment_id')
      .notNull()
      .references(() => attachments.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('portfolio_items_portfolio_idx').on(table.portfolioId)],
);
