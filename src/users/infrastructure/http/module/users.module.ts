import { Module } from '@nestjs/common';
import { CreateUserController } from '../controllers/create-user.controller';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { CreateUserUseCase } from '../../../application/usecases/create-user.use-case';
import { PrismaModule } from 'src/prisma/infrastructure/http/module/prisma.module';
import { DeleteUserUseCase } from 'src/users/application/usecases/delete-user.use-case';
import { DeleteUserController } from '../controllers/delete-user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from 'src/mail/infrastructure/http/module/mail.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_PROVIDER',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ || ''],
          queue: 'mail_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    PrismaModule,
    SharedModule,
    MailModule,
  ],
  controllers: [CreateUserController, DeleteUserController],
  providers: [CreateUserUseCase, DeleteUserUseCase],
})
export class UsersModule {}
