import { Module } from '@nestjs/common';
import { dbPrisma } from '../../database/db';
import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { UsersDbRepository } from 'src/users/infrastructure/repository/users.db.repository';
import { RefreshTokenRepositories } from 'src/refresh-token/domain/repositories/refresh-token.repositories';
import { RefreshTokenDbRepository } from 'src/refresh-token/infrastructure/repository/refresh-token.db.repository';
import { SharedModule } from 'src/shared/infrastructure/http/module/shared.module';

@Module({
  imports: [SharedModule],
  providers: [
    dbPrisma,
    { provide: UserRepositories, useClass: UsersDbRepository },
    { provide: RefreshTokenRepositories, useClass: RefreshTokenDbRepository },
  ],
  exports: [UserRepositories, RefreshTokenRepositories],
})
export class PrismaModule {}
