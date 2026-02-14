import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  index,
} from 'drizzle-orm/pg-core';
import { availabilityEnum, profileVisibilityEnum } from '../enums.schema';
import { users } from './users.schema';

export const userProfiles = pgTable(
  'user_profiles',
  {
    userId: uuid('user_id')
      .primaryKey()
      .references(() => users.id, { onDelete: 'cascade' }),
    firstName: varchar('first_name', { length: 80 }),
    lastName: varchar('last_name', { length: 80 }),
    displayName: varchar('display_name', { length: 120 }),
    headline: varchar('headline', { length: 160 }),
    bio: text('bio'),
    profileVisibility: profileVisibilityEnum('profile_visibility')
      .notNull()
      .default('public'),
    availability: availabilityEnum('availability').default('as_needed'),
    hourlyRate: numeric('hourly_rate', { precision: 10, scale: 2 }),
    currencyCode: varchar('currency_code', { length: 3 }),
    totalHours: integer('total_hours').default(0),
    jobSuccessScore: integer('job_success_score'),
    profileCompletedAt: timestamp('profile_completed_at', {
      withTimezone: true,
    }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    visibilityIdx: index('user_profiles_visibility_idx').on(
      table.profileVisibility,
    ),
  }),
);
