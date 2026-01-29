import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class RefreshTokenRepositories {
  abstract findRefreshTokenById(id: string): Promise<RefreshToken | null>;
  abstract createRefreshToken(
    refreshToken: RefreshToken,
  ): Promise<RefreshToken>;
  abstract deleteManyRefreshTokensUsers(userId: string): Promise<void>;
}
