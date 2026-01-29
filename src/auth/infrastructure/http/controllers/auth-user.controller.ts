import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthUserUseCase } from 'src/auth/application/usecases/auth-user.use-case';
import { IAuthUserDTO } from '../dto/auth-user.dto';
import type { Response } from 'express';

@Controller('user')
export class AuthUserController {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async authUser(
    @Body() data: IAuthUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, refreshTokenId, accessToken } =
      await this.authUserUseCase.execute(data);

    response.cookie('RefreshToken', refreshTokenId, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      token: accessToken,
      userData: user,
    };
  }
}
