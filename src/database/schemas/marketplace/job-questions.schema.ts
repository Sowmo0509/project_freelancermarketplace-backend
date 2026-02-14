import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  index,
  timestamp,
} from 'drizzle-orm/pg-core';
import { jobPostings } from './job-postings.schema';

export const jobQuestions = pgTable(
  'job_questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobPostings.id, { onDelete: 'cascade' }),
    question: text('question').notNull(),
    isRequired: boolean('is_required').notNull().default(false),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('job_questions_job_idx').on(table.jobId)],
);
