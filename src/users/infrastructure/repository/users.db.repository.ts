import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { dbPrisma } from 'src/prisma/infrastructure/database/db';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UsersDbRepository implements UserRepositories {
  constructor(private readonly database: dbPrisma) {}
  async createUser(user: User): Promise<User> {
    const newUser = await this.database.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return new User(newUser.name, newUser.email, newUser.password, newUser.id);
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
      userAlreadyExists.id,
    );
  }

  async deleteUser(id: string): Promise<void> {
    await this.database.user.delete({
      where: { id },
    });
  }
}
