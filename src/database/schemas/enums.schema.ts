import { pgEnum } from 'drizzle-orm/pg-core';

export const userTypeEnum = pgEnum('user_type', [
  'client',
  'freelancer',
  'admin',
]);
export const userStatusEnum = pgEnum('user_status', [
  'active',
  'pending',
  'suspended',
  'deleted',
]);
export const profileVisibilityEnum = pgEnum('profile_visibility', [
  'public',
  'private',
  'invite_only',
]);
export const availabilityEnum = pgEnum('availability', [
  'as_needed',
  'part_time',
  'full_time',
]);
export const organizationTypeEnum = pgEnum('organization_type', [
  'client',
  'agency',
]);
export const organizationMemberRoleEnum = pgEnum('organization_member_role', [
  'owner',
  'admin',
  'member',
]);
export const skillLevelEnum = pgEnum('skill_level', [
  'beginner',
  'intermediate',
  'expert',
]);
export const languageProficiencyEnum = pgEnum('language_proficiency', [
  'basic',
  'conversational',
  'fluent',
  'native',
]);
export const jobVisibilityEnum = pgEnum('job_visibility', [
  'public',
  'invite_only',
  'private',
]);
export const jobStatusEnum = pgEnum('job_status', [
  'draft',
  'published',
  'closed',
  'filled',
  'archived',
]);
export const projectTypeEnum = pgEnum('project_type', ['fixed', 'hourly']);
export const experienceLevelEnum = pgEnum('experience_level', [
  'entry',
  'intermediate',
  'expert',
]);
export const jobDurationEnum = pgEnum('job_duration', [
  'less_than_1_month',
  'one_to_three_months',
  'three_to_six_months',
  'more_than_6_months',
  'ongoing',
]);
export const workloadEnum = pgEnum('workload', [
  'less_than_30_hours',
  'more_than_30_hours',
  'as_needed',
]);
export const proposalStatusEnum = pgEnum('proposal_status', [
  'submitted',
  'shortlisted',
  'interviewing',
  'accepted',
  'declined',
  'withdrawn',
]);
export const inviteStatusEnum = pgEnum('invite_status', [
  'pending',
  'accepted',
  'declined',
  'expired',
]);
export const contractTypeEnum = pgEnum('contract_type', ['fixed', 'hourly']);
export const contractStatusEnum = pgEnum('contract_status', [
  'active',
  'paused',
  'completed',
  'terminated',
  'disputed',
]);
export const milestoneStatusEnum = pgEnum('milestone_status', [
  'pending',
  'submitted',
  'approved',
  'released',
  'canceled',
]);
export const milestoneSubmissionStatusEnum = pgEnum(
  'milestone_submission_status',
  ['submitted', 'revised', 'approved'],
);
export const timesheetStatusEnum = pgEnum('timesheet_status', [
  'open',
  'submitted',
  'approved',
  'disputed',
]);
export const conversationTypeEnum = pgEnum('conversation_type', [
  'job',
  'contract',
  'direct',
]);
export const messageStatusEnum = pgEnum('message_status', [
  'sent',
  'delivered',
  'read',
]);
export const paymentMethodTypeEnum = pgEnum('payment_method_type', [
  'card',
  'bank_account',
  'paypal',
  'wallet',
]);
export const invoiceStatusEnum = pgEnum('invoice_status', [
  'draft',
  'issued',
  'paid',
  'overdue',
  'void',
]);
export const transactionTypeEnum = pgEnum('transaction_type', [
  'charge',
  'payout',
  'refund',
  'fee',
  'adjustment',
]);
export const transactionStatusEnum = pgEnum('transaction_status', [
  'pending',
  'completed',
  'failed',
  'reversed',
]);
export const escrowStatusEnum = pgEnum('escrow_status', [
  'pending',
  'funded',
  'released',
  'refunded',
  'canceled',
]);
export const payoutStatusEnum = pgEnum('payout_status', [
  'pending',
  'processing',
  'paid',
  'failed',
]);
export const reviewVisibilityEnum = pgEnum('review_visibility', [
  'public',
  'private',
]);
export const disputeStatusEnum = pgEnum('dispute_status', [
  'open',
  'under_review',
  'resolved',
  'canceled',
]);
