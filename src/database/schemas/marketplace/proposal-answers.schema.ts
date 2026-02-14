import { pgTable, uuid, text, index, timestamp } from 'drizzle-orm/pg-core';
import { proposals } from './proposals.schema';
import { jobQuestions } from './job-questions.schema';

export const proposalAnswers = pgTable(
  'proposal_answers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    proposalId: uuid('proposal_id')
      .notNull()
      .references(() => proposals.id, { onDelete: 'cascade' }),
    jobQuestionId: uuid('job_question_id')
      .notNull()
      .references(() => jobQuestions.id, { onDelete: 'cascade' }),
    answer: text('answer').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('proposal_answers_proposal_idx').on(table.proposalId)],
);
