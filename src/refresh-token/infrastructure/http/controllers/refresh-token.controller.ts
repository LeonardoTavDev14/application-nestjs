import { FindRefreshTokenUseCase } from 'src/refresh-token/application/usecases/find.refresh-token.usecase';
import {
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(
    private readonly findRefreshTokenUseCase: FindRefreshTokenUseCase,
  ) {}

  @Post('find')
  @HttpCode(HttpStatus.OK)
  async findRefreshToken(@Req() request: Request) {
    try {
      const refreshToken = request.cookies['RefreshToken'];

      const { accessToken, user } =
        await this.findRefreshTokenUseCase.execute(refreshToken);

      return {
        token: accessToken,
        userData: user,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
