import { pgTable, uuid, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from '../core/users.schema';

export const savedFreelancers = pgTable(
  'saved_freelancers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    freelancerId: uuid('freelancer_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('saved_freelancers_unique_idx').on(
      table.userId,
      table.freelancerId,
    ),
  ],
);
