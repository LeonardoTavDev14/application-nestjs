import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { ICompareProvider } from 'src/shared/application/providers/compare.provider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IJwtProvider } from 'src/shared/application/providers/jwt.provider';
import { IAuthUserDTO } from 'src/auth/infrastructure/http/dto/auth-user.dto';
import { IAuthUserResponseDTO } from 'src/auth/infrastructure/http/dto/auth-user-response.dto';
import { RefreshTokenRepositories } from 'src/refresh-token/domain/repositories/refresh-token.repositories';
import { User } from 'src/users/domain/entities/user.entity';
import { IDayJsProvider } from 'src/shared/application/providers/dayjs.provider';
import { RefreshToken } from 'src/refresh-token/domain/entities/refresh-token.entity';

@Injectable()
export class AuthUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly dayJsProvider: IDayJsProvider,
    private readonly refreshTokenRepository: RefreshTokenRepositories,
    private readonly jwtProvider: IJwtProvider,
  ) {}

  async execute(data: IAuthUserDTO): Promise<IAuthUserResponseDTO> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      data.email,
    );

    if (!userAlreadyExists) {
      throw new BadRequestException('E-mail or password incorrect!');
    }

    if (userAlreadyExists.blockedAccount === true) {
      throw new BadRequestException(
        'Your account blocked, contact support now!',
      );
    }

    const verifySuspendAccount =
      await this.userRepository.suspendedUserIsLocked(userAlreadyExists);

    if (verifySuspendAccount) {
      throw new BadRequestException('Your account is suspended for 5 minutes!');
    }

    const isPasswordValid = await this.compareProvider.compare(
      data.password,
      userAlreadyExists.password,
    );

    if (!isPasswordValid) {
      const userAttemptsData = userAlreadyExists.authAttempts ?? 0;
      const countAttempts = userAttemptsData + 1;

      if (countAttempts >= 5) {
        if (countAttempts >= 10) {
          const updatesUserData = User.updateUserInfo(userAlreadyExists, {
            authAttempts: countAttempts,
            blockedAccount: true,
          });

          await this.userRepository.updateUser(updatesUserData);

          throw new BadRequestException('Your account is blocked!');
        }

        const suspendedAccountTime = this.dayJsProvider.add(5, 'minute');

        const updatesUserData = User.updateUserInfo(userAlreadyExists, {
          authAttempts: countAttempts,
          suspendedAccount: suspendedAccountTime,
        });

        await this.userRepository.updateUser(updatesUserData);

        throw new BadRequestException(
          `Your account is suspended for 5 minutes, contact to support!`,
        );
      }
      const updatesUserData = User.updateUserInfo(userAlreadyExists, {
        authAttempts: countAttempts,
      });

      await this.userRepository.updateUser(updatesUserData);

      throw new BadRequestException('E-mail or password incorrect!');
    }

    const updatesUserData = User.updateUserInfo(userAlreadyExists, {
      authAttempts: 0,
    });

    await this.userRepository.updateUser(updatesUserData);

    await this.refreshTokenRepository.deleteManyRefreshTokensUsers(
      userAlreadyExists.id as string,
    );

    const newRefreshToken = new RefreshToken(
      userAlreadyExists.role,
      userAlreadyExists.id as string,
    );

    const refreshToken =
      await this.refreshTokenRepository.createRefreshToken(newRefreshToken);

    const accessToken = await this.jwtProvider.generateToken({
      id: userAlreadyExists.id!,
      role: userAlreadyExists.role,
    });

    return {
      user: { name: userAlreadyExists.name, email: userAlreadyExists.email },
      refreshTokenId: refreshToken.id!,
      accessToken,
    };
  }
}
