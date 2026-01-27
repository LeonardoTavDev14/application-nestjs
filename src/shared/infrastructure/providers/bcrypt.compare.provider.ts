import { Injectable } from '@nestjs/common';
import { ICompareProvider } from 'src/shared/application/providers/compare.provider';
import { compare } from 'bcryptjs';

@Injectable()
export class BcryptCompareProvider implements ICompareProvider {
  async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
