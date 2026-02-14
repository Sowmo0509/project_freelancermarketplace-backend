import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { milestoneSubmissionStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { attachments } from '../core/attachments.schema';
import { milestones } from './milestones.schema';

export const milestoneSubmissions = pgTable(
  'milestone_submissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    milestoneId: uuid('milestone_id')
      .notNull()
      .references(() => milestones.id, { onDelete: 'cascade' }),
    submittedBy: uuid('submitted_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    message: text('message'),
    attachmentId: uuid('attachment_id').references(() => attachments.id, {
      onDelete: 'set null',
    }),
    status: milestoneSubmissionStatusEnum('status')
      .notNull()
      .default('submitted'),
    submittedAt: timestamp('submitted_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    milestoneIdx: index('milestone_submissions_milestone_idx').on(
      table.milestoneId,
    ),
    statusIdx: index('milestone_submissions_status_idx').on(table.status),
  }),
);
