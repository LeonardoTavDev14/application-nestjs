import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { FindUserProfileUseCase } from 'src/users/application/usecases/find-user-profile.use-case';
import { ActiveUser } from 'src/auth/infrastructure/decorators/active-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class FindUserProfileController {
  constructor(
    private readonly findUserProfileUseCase: FindUserProfileUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async findUserProfile(@ActiveUser() user: any) {
    const userProfile = await this.findUserProfileUseCase.execute(user.id);

    return {
      profile: userProfile,
    };
  }
}
