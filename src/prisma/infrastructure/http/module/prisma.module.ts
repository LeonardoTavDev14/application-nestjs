import { Module } from '@nestjs/common';
import { dbPrisma } from '../../database/db';
import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { UsersDbRepository } from 'src/users/infrastructure/repository/users.db.repository';

@Module({
  providers: [
    dbPrisma,
    { provide: UserRepositories, useClass: UsersDbRepository },
  ],
  exports: [UserRepositories],
})
export class PrismaModule {}
