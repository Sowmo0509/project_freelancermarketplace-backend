import { pgTable, uuid, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from '../core/users.schema';
import { jobPostings } from './job-postings.schema';

export const savedJobs = pgTable(
  'saved_jobs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobPostings.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('saved_jobs_unique_idx').on(table.userId, table.jobId),
  ],
);
