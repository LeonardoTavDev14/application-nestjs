import {
  INodemailerProvider,
  sendPayload,
} from 'src/shared/application/providers/nodemailer.provider';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestNodemailerProvider implements INodemailerProvider {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configEnv: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configEnv.get<string>('DEV_HOST'),
        pass: this.configEnv.get<string>('DEV_PASS'),
      },
    });
  }
  async sendingMail(payload: sendPayload): Promise<void> {
    const mailOptions = {
      to: payload.email,
      from: this.configEnv.get<string>('DEV_HOST'),
      subject: payload.subject,
      text: 'APP-MY-QM',
      html: payload.html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
