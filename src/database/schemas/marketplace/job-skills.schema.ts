import {
  pgTable,
  uuid,
  boolean,
  uniqueIndex,
  timestamp,
} from 'drizzle-orm/pg-core';
import { skills } from '../core/skills.schema';
import { jobPostings } from './job-postings.schema';

export const jobSkills = pgTable(
  'job_skills',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    jobId: uuid('job_id')
      .notNull()
      .references(() => jobPostings.id, { onDelete: 'cascade' }),
    skillId: uuid('skill_id')
      .notNull()
      .references(() => skills.id, { onDelete: 'cascade' }),
    isRequired: boolean('is_required').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    jobSkillIdx: uniqueIndex('job_skills_unique_idx').on(
      table.jobId,
      table.skillId,
    ),
  }),
);
