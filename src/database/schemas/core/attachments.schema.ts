import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const attachments = pgTable(
  'attachments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ownerUserId: uuid('owner_user_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    fileName: varchar('file_name', { length: 260 }).notNull(),
    fileUrl: varchar('file_url', { length: 500 }).notNull(),
    mimeType: varchar('mime_type', { length: 120 }),
    sizeBytes: integer('size_bytes'),
    storageProvider: varchar('storage_provider', { length: 80 }),
    checksum: varchar('checksum', { length: 128 }),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('attachments_owner_idx').on(table.ownerUserId)],
);
