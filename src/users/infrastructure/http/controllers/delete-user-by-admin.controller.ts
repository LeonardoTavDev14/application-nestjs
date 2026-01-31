import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserByAdminUseCase } from 'src/users/application/usecases/delete-user-by-admin.use-case';
import { IDeleteUserByAdminDTO } from '../dto/delete-user-by-admin.dto';
import { ActiveUser } from 'src/auth/infrastructure/decorators/active-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { userRoles } from 'src/users/domain/entities/user.entity';

@Controller('user')
export class DeleteUserByAdminController {
  constructor(
    private readonly deleteUserByAdminUseCase: DeleteUserByAdminUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete('/admin')
  @HttpCode(HttpStatus.OK)
  async deleteUserByAdmin(
    @ActiveUser() user: { id: string; role: userRoles },
    @Body() data: IDeleteUserByAdminDTO,
  ) {
    await this.deleteUserByAdminUseCase.execute({
      id: user.id,
      email: data.email,
    });

    return {
      message: 'Usuário foi encontrado e deletado com sucesso!',
    };
  }
}
