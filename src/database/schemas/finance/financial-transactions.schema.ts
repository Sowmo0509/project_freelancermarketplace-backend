import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  numeric,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { transactionStatusEnum, transactionTypeEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { contracts } from '../marketplace/contracts.schema';
import { invoices } from './invoices.schema';
import { escrowDeposits } from './escrow-deposits.schema';

export const financialTransactions = pgTable(
  'financial_transactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    contractId: uuid('contract_id').references(() => contracts.id, {
      onDelete: 'set null',
    }),
    invoiceId: uuid('invoice_id').references(() => invoices.id, {
      onDelete: 'set null',
    }),
    escrowDepositId: uuid('escrow_deposit_id').references(
      () => escrowDeposits.id,
      { onDelete: 'set null' },
    ),
    type: transactionTypeEnum('type').notNull(),
    status: transactionStatusEnum('status').notNull().default('pending'),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currencyCode: varchar('currency_code', { length: 3 }).notNull(),
    provider: varchar('provider', { length: 80 }),
    providerReference: varchar('provider_reference', { length: 200 }),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    settledAt: timestamp('settled_at', { withTimezone: true }),
  },
  (table) => [
    index('financial_transactions_user_idx').on(table.userId),
    index('financial_transactions_contract_idx').on(table.contractId),
    index('financial_transactions_invoice_idx').on(table.invoiceId),
    index('financial_transactions_status_idx').on(table.status),
  ],
);
