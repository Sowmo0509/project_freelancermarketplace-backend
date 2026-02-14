import {
  pgTable,
  uuid,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from '../core/users.schema';
import { conversations } from './conversations.schema';

export const conversationParticipants = pgTable(
  'conversation_participants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
    lastReadAt: timestamp('last_read_at', { withTimezone: true }),
  },
  (table) => [
    index('conversation_participants_conversation_idx').on(
      table.conversationId,
    ),
    index('conversation_participants_user_idx').on(table.userId),
    uniqueIndex('conversation_participants_unique_idx').on(
      table.conversationId,
      table.userId,
    ),
  ],
);
