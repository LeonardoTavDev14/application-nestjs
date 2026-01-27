import { Module } from '@nestjs/common';
import { UsersModule } from './users/infrastructure/http/module/users.module';
import { SharedModule } from './shared/infrastructure/http/module/shared.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/infrastructure/http/module/prisma.module';
import { AuthModule } from './auth/infrastructure/http/module/auth.module';

@Module({
  imports: [
    UsersModule,
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
