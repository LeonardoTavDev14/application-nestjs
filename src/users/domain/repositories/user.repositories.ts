import { User } from '../entities/user.entity';

export abstract class UserRepositories {
  abstract createUser(user: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updateUser(user: User): Promise<void>;
  abstract suspendedUserIsLocked(user: User): Promise<boolean>;
}
