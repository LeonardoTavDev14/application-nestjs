import { BadRequestException, Injectable } from '@nestjs/common';
import { RefreshTokenRepositories } from 'src/refresh-token/domain/repositories/refresh-token.repositories';
import { IJwtProvider } from 'src/shared/application/providers/jwt.provider';
import { IRefreshTokenResponseDTO } from 'src/refresh-token/infrastructure/http/dto/refresh-token.response.dto';
import { UserRepositories } from 'src/users/domain/repositories/user.repositories';

@Injectable()
export class FindRefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepositories,
    private readonly userRepository: UserRepositories,
    private readonly jwtProvider: IJwtProvider,
  ) {}

  async execute(refreshTokenId: string): Promise<IRefreshTokenResponseDTO> {
    const refreshToken =
      await this.refreshTokenRepository.findRefreshTokenById(refreshTokenId);

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not found!');
    }

    const userAlreadyExists = await this.userRepository.findUserById(
      refreshToken.userId,
    );

    if (!userAlreadyExists) {
      throw new BadRequestException('User not found!');
    }

    const accessToken = await this.jwtProvider.generateToken({
      id: userAlreadyExists.id!,
      role: userAlreadyExists.role,
    });

    return { accessToken, user: userAlreadyExists };
  }
}
