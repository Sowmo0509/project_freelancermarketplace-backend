import {
  pgTable,
  uuid,
  text,
  numeric,
  varchar,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';
import { invoices } from './invoices.schema';

export const invoiceItems = pgTable(
  'invoice_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    invoiceId: uuid('invoice_id')
      .notNull()
      .references(() => invoices.id, { onDelete: 'cascade' }),
    referenceType: varchar('reference_type', { length: 60 }),
    referenceId: uuid('reference_id'),
    description: text('description'),
    quantity: numeric('quantity', { precision: 10, scale: 2 }).default('1'),
    unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('invoice_items_invoice_idx').on(table.invoiceId)],
);
