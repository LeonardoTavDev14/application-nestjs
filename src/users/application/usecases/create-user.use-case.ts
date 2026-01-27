import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { User } from 'src/users/domain/entities/user.entity';
import { ICreateUserDTO } from 'src/users/infrastructure/http/dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { IHashProvider } from 'src/shared/application/providers/hash.provider';
import { INodemailerProvider } from 'src/shared/application/providers/nodemailer.provider';
import { ITemplatesProvider } from 'src/shared/application/providers/templates.provider';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly hashProvider: IHashProvider,
    private readonly nodemailerProvider: INodemailerProvider,
    private readonly templatesProvider: ITemplatesProvider,
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

    await this.nodemailerProvider.sendingMail({
      email: createdUser.email,
      subject: `APP-MY-QM - WELCOME`,
      html: this.templatesProvider.sendWelcome(
        createdUser.name.split(' ')[1],
        createdUser.name.split(' ')[0],
      ),
    });

    return createdUser;
  }
}
