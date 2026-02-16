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

  constructor() {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASS;

    if (!user || !pass) {
      throw new InternalServerErrorException(
        'Gmail credentials are not defined in environment variables',
      );
    }

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP host for Gmail
      port: 465, // SSL port
      secure: true, // true for 465, false for 587
      auth: { user, pass },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<SentMessageInfo> {
    const mailOptions: SendMailOptions = {
      from: `"MyApp" <${process.env.GMAIL_USER}>`,
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
