import { Module } from '@nestjs/common';
import { CreateUserController } from '../controllers/create-user.controller';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { CreateUserUseCase } from '../../../application/usecases/create-user.use-case';
import { PrismaModule } from 'src/prisma/infrastructure/http/module/prisma.module';
import { DeleteUserUseCase } from 'src/users/application/usecases/delete-user.use-case';
import { DeleteUserController } from '../controllers/delete-user.controller';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [CreateUserController, DeleteUserController],
  providers: [CreateUserUseCase, DeleteUserUseCase],
})
export class UsersModule {}
