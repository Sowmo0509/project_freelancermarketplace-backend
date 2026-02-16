import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailQueue {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('emails', {
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });
  }

  async addEmailJob(data: { to: string; subject: string; html: string }) {
    console.log(
      '[MailQueue] Enqueuing email job',
      JSON.stringify({ to: data.to, subject: data.subject }),
    );
    await this.queue.add('send-email', data);
  }
}
