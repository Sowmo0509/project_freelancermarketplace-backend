import { pgTable, uuid, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { timesheetStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { contracts } from './contracts.schema';

export const timesheets = pgTable(
  'timesheets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contractId: uuid('contract_id')
      .notNull()
      .references(() => contracts.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    weekStart: timestamp('week_start', { withTimezone: true }).notNull(),
    weekEnd: timestamp('week_end', { withTimezone: true }).notNull(),
    totalMinutes: integer('total_minutes').notNull().default(0),
    status: timesheetStatusEnum('status').notNull().default('open'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    contractIdx: index('timesheets_contract_idx').on(table.contractId),
    freelancerIdx: index('timesheets_freelancer_idx').on(table.freelancerId),
    statusIdx: index('timesheets_status_idx').on(table.status),
  }),
);
