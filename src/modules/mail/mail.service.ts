import { Injectable, InternalServerErrorException } from '@nestjs/common';
import nodemailer, {
  Transporter,
  SendMailOptions,
  SentMessageInfo,
} from 'nodemailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private transporter: Transporter<SendMailOptions>;
  private readonly defaultFrom: string;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const secure = process.env.SMTP_SECURE;
    const user = process.env.SMTP_USERNAME;
    const pass = process.env.SMTP_PASSWORD;
    const from = process.env.EMAIL_FROM ?? user;

    if (!host || !port || !user || !pass || !from) {
      throw new InternalServerErrorException(
        'SMTP credentials are not defined in environment variables',
      );
    }

    const portNumber = Number(port);
    const isSecure = secure === 'true' || secure === '1';

    this.defaultFrom = from;

    this.transporter = nodemailer.createTransport({
      host,
      port: Number.isNaN(portNumber) ? 587 : portNumber,
      secure: isSecure,
      auth: { user, pass },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<SentMessageInfo> {
    const mailOptions: SendMailOptions = {
      from: `"MyApp" <${this.defaultFrom}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (err) {
      console.error('Failed to send email', err);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
