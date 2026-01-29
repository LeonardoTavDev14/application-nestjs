import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { MailConsumerController } from '../controllers/mail-consumer.controller';

@Module({
  imports: [SharedModule],
  controllers: [MailConsumerController],
})
export class MailModule {}
