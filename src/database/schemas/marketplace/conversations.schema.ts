import { pgTable, uuid, timestamp, jsonb, index } from 'drizzle-orm/pg-core';
import { conversationTypeEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { jobPostings } from './job-postings.schema';
import { contracts } from './contracts.schema';

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: conversationTypeEnum('type').notNull().default('direct'),
    jobId: uuid('job_id').references(() => jobPostings.id, {
      onDelete: 'set null',
    }),
    contractId: uuid('contract_id').references(() => contracts.id, {
      onDelete: 'set null',
    }),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('conversations_creator_idx').on(table.createdBy)],
);
