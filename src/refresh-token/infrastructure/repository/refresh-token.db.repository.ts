import { RefreshTokenRepositories } from 'src/refresh-token/domain/repositories/refresh-token.repositories';
import { dbPrisma } from 'src/prisma/infrastructure/database/db';
import { RefreshToken } from 'src/refresh-token/domain/entities/refresh-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenDbRepository implements RefreshTokenRepositories {
  constructor(private readonly prisma: dbPrisma) {}
  async findRefreshTokenById(id: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { id },
    });

    if (!refreshToken) {
      return null;
    }

    return new RefreshToken(
      refreshToken.userRole,
      refreshToken.userId,
      refreshToken.id,
    );
  }

  async createRefreshToken(refreshToken: RefreshToken): Promise<RefreshToken> {
    const newRefreshToken = await this.prisma.refreshToken.create({
      data: {
        userRole: refreshToken.userRole,
        userId: refreshToken.userId,
      },
    });

    return new RefreshToken(
      newRefreshToken.userRole,
      newRefreshToken.userId,
      newRefreshToken.id,
    );
  }

  async deleteManyRefreshTokensUsers(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
