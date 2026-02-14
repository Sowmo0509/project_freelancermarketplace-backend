import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { escrowStatusEnum } from '../enums.schema';
import { contracts } from '../marketplace/contracts.schema';
import { milestones } from '../marketplace/milestones.schema';

export const escrowDeposits = pgTable(
  'escrow_deposits',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    milestoneId: uuid('milestone_id').references(() => milestones.id, {
      onDelete: 'set null',
    }),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currencyCode: varchar('currency_code', { length: 3 }).notNull(),
    status: escrowStatusEnum('status').notNull().default('pending'),
    fundedAt: timestamp('funded_at', { withTimezone: true }),
    releasedAt: timestamp('released_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('escrow_deposits_contract_idx').on(table.contractId),
    index('escrow_deposits_milestone_idx').on(table.milestoneId),
    index('escrow_deposits_status_idx').on(table.status),
  ],
);
