import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { invoiceStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { contracts } from '../marketplace/contracts.schema';

export const invoices = pgTable(
  'invoices',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    clientId: uuid('client_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: invoiceStatusEnum('status').notNull().default('draft'),
    issueDate: timestamp('issue_date', { withTimezone: true }),
    dueDate: timestamp('due_date', { withTimezone: true }),
    subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
    fees: numeric('fees', { precision: 12, scale: 2 }).default('0'),
    total: numeric('total', { precision: 12, scale: 2 }).notNull(),
    currencyCode: varchar('currency_code', { length: 3 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('invoices_contract_idx').on(table.contractId),
    index('invoices_client_idx').on(table.clientId),
    index('invoices_freelancer_idx').on(table.freelancerId),
    index('invoices_status_idx').on(table.status),
  ],
);
