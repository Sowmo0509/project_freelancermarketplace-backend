import {
  pgTable,
  uuid,
  timestamp,
  jsonb,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { organizationMemberRoleEnum } from '../enums.schema';
import { organizations } from './organizations.schema';
import { users } from './users.schema';

export const organizationMembers = pgTable(
  'organization_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: organizationMemberRoleEnum('role').notNull().default('member'),
    permissions: jsonb('permissions'),
    joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    membershipIdx: uniqueIndex('organization_membership_idx').on(
      table.organizationId,
      table.userId,
    ),
  }),
);
