import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/infrastructure/http/module/prisma.module';
import { FindRefreshTokenUseCase } from 'src/refresh-token/application/usecases/find.refresh-token.usecase';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';
import { RefreshTokenController } from '../controllers/refresh-token.controller';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [RefreshTokenController],
  providers: [FindRefreshTokenUseCase],
})
export class RefreshtokenModule {}
