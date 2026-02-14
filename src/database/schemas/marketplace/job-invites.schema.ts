import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { inviteStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { jobPostings } from './job-postings.schema';

export const jobInvites = pgTable(
  'job_invites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobPostings.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    inviterId: uuid('inviter_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    message: text('message'),
    status: inviteStatusEnum('status').notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    respondedAt: timestamp('responded_at', { withTimezone: true }),
  },
  (table) => ({
    jobIdx: index('job_invites_job_idx').on(table.jobId),
    freelancerIdx: index('job_invites_freelancer_idx').on(table.freelancerId),
    statusIdx: index('job_invites_status_idx').on(table.status),
  }),
);
