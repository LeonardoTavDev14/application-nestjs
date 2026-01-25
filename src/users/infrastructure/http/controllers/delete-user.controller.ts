import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { DeleteUserUseCase } from 'src/users/application/usecases/delete-user.use-case';

@Controller('user')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeUser(@Param('id') id: string) {
    try {
      await this.deleteUserUseCase.execute(id);

      return {
        message: 'Sua conta foi deletada com sucesso!',
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
