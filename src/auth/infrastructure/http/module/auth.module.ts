import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/infrastructure/http/module/prisma.module';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { AuthUserUseCase } from 'src/auth/application/usecases/auth-user.use-case';
import { AuthUserController } from '../controllers/auth-user.controller';

@Module({
  imports: [PrismaModule, SharedModule, PassportModule],
  controllers: [AuthUserController],
  providers: [JwtStrategy, AuthUserUseCase],
})
export class AuthModule {}
