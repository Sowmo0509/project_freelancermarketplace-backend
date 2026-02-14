import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { payoutStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { paymentMethods } from './payment-methods.schema';

export const payouts = pgTable(
  'payouts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    paymentMethodId: uuid('payment_method_id').references(
      () => paymentMethods.id,
      { onDelete: 'set null' },
    ),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currencyCode: varchar('currency_code', { length: 3 }).notNull(),
    status: payoutStatusEnum('status').notNull().default('pending'),
    processedAt: timestamp('processed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('payouts_user_idx').on(table.userId),
    index('payouts_status_idx').on(table.status),
  ],
);
