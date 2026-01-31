import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { userRoles } from 'src/users/domain/entities/user.entity';
import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { IDeleteUserByAdminDTO } from 'src/users/infrastructure/http/dto/delete-user-by-admin.dto';

@Injectable()
export class DeleteUserByAdminUseCase {
  constructor(private readonly userRepository: UserRepositories) {}

  async execute(data: IDeleteUserByAdminDTO): Promise<void> {
    const adminRequested = await this.userRepository.findUserById(data.id);

    if (!adminRequested) {
      throw new ForbiddenException('User not found!');
    }

    if (adminRequested.role === userRoles.USER) {
      throw new ForbiddenException('You don´t have permission for this.');
    }

    const targetUser = await this.userRepository.findUserByEmail(data.email);

    if (!targetUser) {
      throw new NotFoundException('User to delete not found!');
    }

    if (targetUser.id === adminRequested.id) {
      throw new UnauthorizedException(
        'You cannot delete your own account via admin!',
      );
    }

    if (
      targetUser.role === userRoles.SUPERADMIN &&
      adminRequested.role !== userRoles.SUPERADMIN
    ) {
      throw new ForbiddenException(
        'Insufficient privileges to delete a Super Admin.',
      );
    }

    await this.userRepository.deleteUserByAdmin(targetUser.email);
  }
}
