import { Module } from '@nestjs/common';
import { CreateUserController } from '../controllers/create-user.controller';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { CreateUserUseCase } from '../../../application/usecases/create-user.use-case';
import { PrismaModule } from 'src/prisma/infrastructure/http/module/prisma.module';
import { DeleteUserUseCase } from 'src/users/application/usecases/delete-user.use-case';
import { DeleteUserController } from '../controllers/delete-user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from 'src/mail/infrastructure/http/module/mail.module';
import { FindUserProfileController } from '../controllers/find-user-profile.controller';
import { FindUserProfileUseCase } from 'src/users/application/usecases/find-user-profile.use-case';
import { DeleteUserByAdminUseCase } from 'src/users/application/usecases/delete-user-by-admin.use-case';
import { DeleteUserByAdminController } from '../controllers/delete-user-by-admin.controller';

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
  controllers: [
    CreateUserController,
    DeleteUserController,
    FindUserProfileController,
    DeleteUserByAdminController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindUserProfileUseCase,
    DeleteUserByAdminUseCase,
  ],
})
export class UsersModule {}
