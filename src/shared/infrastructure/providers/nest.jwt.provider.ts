import { IJwtProvider } from 'src/shared/application/providers/jwt.provider';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestJwtProvider implements IJwtProvider {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
