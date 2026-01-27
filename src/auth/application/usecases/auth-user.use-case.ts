import { UserRepositories } from 'src/users/domain/repositories/user.repositories';
import { ICompareProvider } from 'src/shared/application/providers/compare.provider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IJwtProvider } from 'src/shared/application/providers/jwt.provider';
import { IAuthUserDTO } from 'src/auth/infrastructure/http/dto/auth-user.dto';
import { IAuthUserResponseDTO } from 'src/auth/infrastructure/http/dto/auth-user-response.dto';

@Injectable()
export class AuthUserUseCase {
  constructor(
    private readonly userRepository: UserRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly jwtProvider: IJwtProvider,
  ) {}

  async execute(data: IAuthUserDTO): Promise<IAuthUserResponseDTO> {
    const userAlreadyExists = await this.userRepository.findUserByEmail(
      data.email,
    );

    if (!userAlreadyExists) {
      throw new BadRequestException('E-mail ou senha incorretos!');
    }

    const isPasswordValid = await this.compareProvider.compare(
      data.password,
      userAlreadyExists.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('E-mail ou senha incorretos!');
    }

    const accessToken = await this.jwtProvider.generateToken({
      id: userAlreadyExists.id!,
      role: userAlreadyExists.role,
    });

    return {
      user: { name: userAlreadyExists.name, email: userAlreadyExists.email },
      accessToken,
    };
  }
}
