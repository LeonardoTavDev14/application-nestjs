import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActiveUser } from 'src/auth/infrastructure/decorators/active-user.decorator';
import { DeleteUserUseCase } from 'src/users/application/usecases/delete-user.use-case';

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeUser(@ActiveUser() user: any) {
    await this.deleteUserUseCase.execute(user.id);

    return {
      message: 'Sua conta foi deletada com sucesso!',
    };
  }
}
