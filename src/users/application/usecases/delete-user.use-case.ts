import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { INodemailerProvider } from 'src/shared/application/providers/nodemailer.provider';
import { ITemplatesProvider } from 'src/shared/application/providers/templates.provider';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly nodemailerProvider: INodemailerProvider,
    private readonly templatesProvider: ITemplatesProvider,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new BadRequestException('Falha ao encontrar os dados do usuário!');
    }

    await this.nodemailerProvider.sendingMail({
      email: user.email,
      subject: `APP-MY-QM - ACCOUNT DELETED`,
      html: this.templatesProvider.sendDeleted(user.name),
    });

    await this.userRepository.deleteUser(user.id!);
  }
}
