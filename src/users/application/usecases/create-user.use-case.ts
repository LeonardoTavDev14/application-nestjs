import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { User } from 'src/users/domain/entities/user.entity';
import { ICreateUserDTO } from 'src/users/infrastructure/http/dto/create-user.dto';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IHashProvider } from 'src/shared/application/providers/hash.provider';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly hashProvider: IHashProvider,
    @Inject('MAIL_PROVIDER') private readonly mailClient: ClientProxy,
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new ConflictException('User already exists!');
    }

    const hashedPassword = await this.hashProvider.hash(data.password);

    const newUser = new User(
      data.name,
      data.email,
      hashedPassword,
      data.age,
      'USER',
    );

    const createdUser = await this.userRepository.createUser(newUser);

    this.mailClient.emit('send_welcome_email', {
      email: createdUser.email,
      name: createdUser.name,
    });

    return createdUser;
  }
}
