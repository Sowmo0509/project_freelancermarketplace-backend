import { pgTable, uuid, index, timestamp } from 'drizzle-orm/pg-core';
import { attachments } from '../core/attachments.schema';
import { messages } from './messages.schema';

export const messageAttachments = pgTable(
  'message_attachments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    messageId: uuid('message_id')
      .notNull()
      .references(() => messages.id, { onDelete: 'cascade' }),
    attachmentId: uuid('attachment_id')
      .notNull()
      .references(() => attachments.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('message_attachments_message_idx').on(table.messageId)],
);
