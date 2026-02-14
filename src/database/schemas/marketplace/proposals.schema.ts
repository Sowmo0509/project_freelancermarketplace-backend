import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  varchar,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { proposalStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { jobPostings } from './job-postings.schema';

export const proposals = pgTable(
  'proposals',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobPostings.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    coverLetter: text('cover_letter'),
    status: proposalStatusEnum('status').notNull().default('submitted'),
    proposedRate: numeric('proposed_rate', { precision: 10, scale: 2 }),
    proposedBudget: numeric('proposed_budget', { precision: 12, scale: 2 }),
    currencyCode: varchar('currency_code', { length: 3 }),
    availabilityDate: timestamp('availability_date', { withTimezone: true }),
    estimatedDuration: varchar('estimated_duration', { length: 120 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    jobIdx: index('proposals_job_idx').on(table.jobId),
    freelancerIdx: index('proposals_freelancer_idx').on(table.freelancerId),
    statusIdx: index('proposals_status_idx').on(table.status),
    uniqueProposalIdx: uniqueIndex('proposals_unique_idx').on(
      table.jobId,
      table.freelancerId,
    ),
  }),
);
