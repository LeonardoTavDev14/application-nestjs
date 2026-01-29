import { User } from 'src/users/domain/entities/user.entity';

export class IRefreshTokenResponseDTO {
  accessToken: string;
  user: User;
}
