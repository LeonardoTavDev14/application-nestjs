import {
  IUserProfile,
  UserRepositories,
} from 'src/users/domain/repositories/user.repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FindUserProfileUseCase {
  constructor(private readonly userRepository: UserRepositories) {}

  async execute(id: string): Promise<IUserProfile> {
    const userAlreadyExists = await this.userRepository.findUserProfile(id);

    if (!userAlreadyExists) {
      throw new BadRequestException('User profile not found!');
    }

    return userAlreadyExists;
  }
}
