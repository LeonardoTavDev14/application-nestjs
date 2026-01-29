import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { dbPrisma } from 'src/prisma/infrastructure/database/db';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { IDayJsProvider } from 'src/shared/application/providers/dayjs.provider';

@Injectable()
export class UsersDbRepository implements UserRepositories {
  constructor(
    private readonly database: dbPrisma,
    private readonly dayJsProvider: IDayJsProvider,
  ) {}
  async createUser(user: User): Promise<User> {
    const newUser = await this.database.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        role: user.role,
        authAttempts: null,
        suspendedAccount: null,
        blockedAccount: false,
      },
    });

    return new User(
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.age,
      newUser.role,
      newUser.authAttempts,
      newUser.suspendedAccount,
      newUser.blockedAccount,
      newUser.id,
    );
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userAlreadyExists = await this.database.user.findFirst({
      where: { email },
    });

    if (!userAlreadyExists) {
      return null;
    }

    return new User(
      userAlreadyExists.name,
      userAlreadyExists.email,
      userAlreadyExists.password,
      userAlreadyExists.age,
      userAlreadyExists.role,
      userAlreadyExists.authAttempts,
      userAlreadyExists.suspendedAccount,
      userAlreadyExists.blockedAccount,
      userAlreadyExists.id,
    );
  }

  async findUserById(id: string): Promise<User | null> {
    const userAlreadyExists = await this.database.user.findFirst({
      where: { id },
    });

    if (!userAlreadyExists) {
      return null;
    }

    return new User(
      userAlreadyExists.name,
      userAlreadyExists.email,
      userAlreadyExists.password,
      userAlreadyExists.age,
      userAlreadyExists.role,
      userAlreadyExists.authAttempts,
      userAlreadyExists.suspendedAccount,
      userAlreadyExists.blockedAccount,
      userAlreadyExists.id,
    );
  }

  async deleteUser(id: string): Promise<void> {
    await this.database.user.delete({
      where: { id },
    });
  }

  async updateUser(user: User): Promise<void> {
    await this.database.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        password: user.password,
        age: user.age,
        role: user.role,
        authAttempts: user.authAttempts,
        suspendedAccount: user.suspendedAccount,
        blockedAccount: user.blockedAccount,
      },
    });
  }

  async suspendedUserIsLocked(user: User): Promise<boolean> {
    if (!user.suspendedAccount) return false;

    const isSuspendedAccount = this.dayJsProvider.isBefore(
      user.suspendedAccount,
    );

    return isSuspendedAccount;
  }
}
