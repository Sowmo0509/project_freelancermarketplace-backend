import {
  pgTable,
  uuid,
  integer,
  uniqueIndex,
  timestamp,
} from 'drizzle-orm/pg-core';
import { skillLevelEnum } from '../enums.schema';
import { users } from './users.schema';
import { skills } from './skills.schema';

export const userSkills = pgTable(
  'user_skills',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    skillId: uuid('skill_id')
      .notNull()
      .references(() => skills.id, { onDelete: 'cascade' }),
    proficiency: skillLevelEnum('proficiency')
      .notNull()
      .default('intermediate'),
    yearsExperience: integer('years_experience'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('user_skills_unique_idx').on(table.userId, table.skillId),
  ],
);
