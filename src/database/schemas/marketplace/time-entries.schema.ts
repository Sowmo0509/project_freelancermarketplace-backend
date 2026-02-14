import {
  pgTable,
  uuid,
  timestamp,
  integer,
  text,
  index,
} from 'drizzle-orm/pg-core';
import { timesheets } from './timesheets.schema';

export const timeEntries = pgTable(
  'time_entries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    timesheetId: uuid('timesheet_id')
      .notNull()
      .references(() => timesheets.id, { onDelete: 'cascade' }),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    endedAt: timestamp('ended_at', { withTimezone: true }).notNull(),
    minutes: integer('minutes').notNull(),
    memo: text('memo'),
    activityLevel: integer('activity_level'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('time_entries_timesheet_idx').on(table.timesheetId)],
);
