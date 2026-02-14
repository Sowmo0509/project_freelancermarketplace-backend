import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  numeric,
  integer,
  index,
} from 'drizzle-orm/pg-core';
import { milestoneStatusEnum } from '../enums.schema';
import { contracts } from './contracts.schema';

export const milestones = pgTable(
  'milestones',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 160 }).notNull(),
    description: text('description'),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    dueAt: timestamp('due_at', { withTimezone: true }),
    status: milestoneStatusEnum('status').notNull().default('pending'),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractIdx: index('milestones_contract_idx').on(table.contractId),
    statusIdx: index('milestones_status_idx').on(table.status),
  }),
);
