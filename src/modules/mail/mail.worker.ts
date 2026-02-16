import { Worker, Job } from 'bullmq';
import { MailService, SendEmailOptions } from './mail.service';

const mailService = new MailService();

new Worker<SendEmailOptions>(
  'emails',
  async (job: Job<SendEmailOptions>) => {
    const { to, subject, html } = job.data;
    await mailService.sendEmail({ to, subject, html });
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  },
);
