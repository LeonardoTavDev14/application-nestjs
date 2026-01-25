import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { User } from 'src/users/domain/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FindUserProfileUseCase {
  constructor(private readonly userRepository: UserRepositories) {}

  async execute(id: string): Promise<User> {
    const userAlreadyExists = await this.userRepository.findUserById(id);

    if (!userAlreadyExists) {
      throw new BadRequestException('Falha ao encontrar os dados do usuário!');
    }

    return userAlreadyExists;
  }
}
