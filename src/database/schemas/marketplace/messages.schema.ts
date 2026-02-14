import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { messageStatusEnum } from '../enums.schema';
import { users } from '../core/users.schema';
import { conversations } from './conversations.schema';

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    senderId: uuid('sender_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    body: text('body').notNull(),
    status: messageStatusEnum('status').notNull().default('sent'),
    sentAt: timestamp('sent_at', { withTimezone: true }).defaultNow().notNull(),
    editedAt: timestamp('edited_at', { withTimezone: true }),
  },
  (table) => [
    index('messages_conversation_idx').on(table.conversationId),
    index('messages_sender_idx').on(table.senderId),
  ],
);
