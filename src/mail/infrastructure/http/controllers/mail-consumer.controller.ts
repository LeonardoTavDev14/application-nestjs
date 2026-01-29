import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { INodemailerProvider } from 'src/shared/application/providers/nodemailer.provider';
import { ITemplatesProvider } from 'src/shared/application/providers/templates.provider';
import { IMailConsumerDTO } from '../dto/mail-consumer.dto';

@Controller()
export class MailConsumerController {
  constructor(
    private readonly nodemailerProvider: INodemailerProvider,
    private readonly templatesProvider: ITemplatesProvider,
  ) {}

  @EventPattern('send_welcome_email')
  async handleWelcomeEmailSender(@Payload() data: IMailConsumerDTO) {
    await this.nodemailerProvider.sendingMail({
      email: data.email,
      subject: 'APP-MQ - INTRODUCTION IN MY APP',
      html: this.templatesProvider.sendWelcome(
        data.name.split(' ')[1],
        data.name.split(' ')[0],
      ),
    });
  }

  @EventPattern('send_deleted_email')
  async handleDeleteEmailSender(@Payload() data: IMailConsumerDTO) {
    await this.nodemailerProvider.sendingMail({
      email: data.email,
      subject: 'APP-MQ - DELETED ACCOUNT',
      html: this.templatesProvider.sendDeleted(data.name.split(' ')[0]),
    });
  }
}
