import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailQueue } from './mail.queue';

@Module({
  providers: [MailService, MailQueue],
  exports: [MailService, MailQueue],
})
export class MailModule {}
