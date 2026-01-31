import { User } from '../entities/user.entity';
import { userRoles } from '@prisma/client';

export class IUserProfile {
  name: string;
  email: string;
  age: number;
  role: userRoles;
}

export abstract class UserRepositories {
  abstract createUser(user: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(user: User): Promise<void>;
  abstract suspendedUserIsLocked(user: User): Promise<boolean>;
  abstract findUserProfile(id: string): Promise<IUserProfile | null>;
  abstract deleteUserByAdmin(email: string): Promise<void>;
}
