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
import { contractStatusEnum, contractTypeEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { jobPostings } from './job-postings.schema';
import { proposals } from './proposals.schema';

export const contracts = pgTable(
  'contracts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    jobId: uuid('job_id').references(() => jobPostings.id, {
      onDelete: 'set null',
    }),
    proposalId: uuid('proposal_id').references(() => proposals.id, {
      onDelete: 'set null',
    }),
    clientId: uuid('client_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 200 }).notNull(),
    contractType: contractTypeEnum('contract_type').notNull(),
    status: contractStatusEnum('status').notNull().default('active'),
    terms: text('terms'),
    hourlyRate: numeric('hourly_rate', { precision: 10, scale: 2 }),
    weeklyLimit: integer('weekly_limit'),
    totalBudget: numeric('total_budget', { precision: 12, scale: 2 }),
    currencyCode: varchar('currency_code', { length: 3 }),
    startAt: timestamp('start_at', { withTimezone: true }),
    endAt: timestamp('end_at', { withTimezone: true }),
    terminatedAt: timestamp('terminated_at', { withTimezone: true }),
    terminationReason: text('termination_reason'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    clientIdx: index('contracts_client_idx').on(table.clientId),
    freelancerIdx: index('contracts_freelancer_idx').on(table.freelancerId),
    statusIdx: index('contracts_status_idx').on(table.status),
  }),
);
