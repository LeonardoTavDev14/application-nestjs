import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthUserUseCase } from 'src/auth/application/usecases/auth-user.use-case';
import { IAuthUserDTO } from '../dto/auth-user.dto';

@Controller('user')
export class AuthUserController {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async authUser(@Body() data: IAuthUserDTO) {
    try {
      const { user, accessToken } = await this.authUserUseCase.execute(data);

      return {
        token: accessToken,
        userData: user,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
