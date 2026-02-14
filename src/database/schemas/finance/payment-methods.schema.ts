import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { paymentMethodTypeEnum } from '../enums.schema';
import { users } from '../core/users.schema';

export const paymentMethods = pgTable(
  'payment_methods',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: paymentMethodTypeEnum('type').notNull(),
    provider: varchar('provider', { length: 80 }),
    externalId: varchar('external_id', { length: 160 }),
    brand: varchar('brand', { length: 60 }),
    last4: varchar('last4', { length: 4 }),
    expMonth: integer('exp_month'),
    expYear: integer('exp_year'),
    billingDetails: jsonb('billing_details'),
    isDefault: boolean('is_default').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('payment_methods_user_idx').on(table.userId)],
);
