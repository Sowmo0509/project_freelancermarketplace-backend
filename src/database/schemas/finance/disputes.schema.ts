import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { disputeStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { contracts } from '../marketplace/contracts.schema';

export const disputes = pgTable(
  'disputes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    openedBy: uuid('opened_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: disputeStatusEnum('status').notNull().default('open'),
    reason: text('reason').notNull(),
    resolution: text('resolution'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  },
  (table) => [
    index('disputes_contract_idx').on(table.contractId),
    index('disputes_status_idx').on(table.status),
  ],
);
