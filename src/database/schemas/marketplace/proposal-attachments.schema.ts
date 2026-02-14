import { pgTable, uuid, index, timestamp } from 'drizzle-orm/pg-core';
import { attachments } from '../core/attachments.schema';
import { proposals } from './proposals.schema';

export const proposalAttachments = pgTable(
  'proposal_attachments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    proposalId: uuid('proposal_id')
      .notNull()
      .references(() => proposals.id, { onDelete: 'cascade' }),
    attachmentId: uuid('attachment_id')
      .notNull()
      .references(() => attachments.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    proposalIdx: index('proposal_attachments_proposal_idx').on(
      table.proposalId,
    ),
  }),
);
