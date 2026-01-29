import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    @Inject('MAIL_PROVIDER') private readonly mailClient: ClientProxy,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new BadRequestException('Falha ao encontrar os dados do usuário!');
    }

    this.mailClient.emit('send_deleted_email', {
      email: user.email,
      name: user.name,
    });

    await this.userRepository.deleteUser(user.id!);
  }
}
