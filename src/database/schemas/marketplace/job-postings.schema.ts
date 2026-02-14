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
import {
  experienceLevelEnum,
  jobDurationEnum,
  jobStatusEnum,
  jobVisibilityEnum,
  projectTypeEnum,
  workloadEnum,
} from '../enums.schema';
import { users } from '../core/users.schema';
import { organizations } from '../core/organizations.schema';
import { jobCategories } from './job-categories.schema';

export const jobPostings = pgTable(
  'job_postings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    organizationId: uuid('organization_id').references(() => organizations.id, {
      onDelete: 'set null',
    }),
    categoryId: uuid('category_id').references(() => jobCategories.id, {
      onDelete: 'set null',
    }),
    title: varchar('title', { length: 200 }).notNull(),
    description: text('description').notNull(),
    scopeOfWork: text('scope_of_work'),
    visibility: jobVisibilityEnum('visibility').notNull().default('public'),
    status: jobStatusEnum('status').notNull().default('draft'),
    projectType: projectTypeEnum('project_type').notNull(),
    experienceLevel: experienceLevelEnum('experience_level').notNull(),
    duration: jobDurationEnum('duration'),
    workload: workloadEnum('workload'),
    budgetMin: numeric('budget_min', { precision: 12, scale: 2 }),
    budgetMax: numeric('budget_max', { precision: 12, scale: 2 }),
    hourlyRateMin: numeric('hourly_rate_min', { precision: 10, scale: 2 }),
    hourlyRateMax: numeric('hourly_rate_max', { precision: 10, scale: 2 }),
    currencyCode: varchar('currency_code', { length: 3 }),
    requiredConnects: integer('required_connects').default(0),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    closedAt: timestamp('closed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('job_postings_client_idx').on(table.clientId),
    index('job_postings_org_idx').on(table.organizationId),
    index('job_postings_status_idx').on(table.status),
  ],
);
