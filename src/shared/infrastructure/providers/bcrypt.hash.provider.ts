import { IHashProvider } from 'src/shared/application/providers/hash.provider';
import { hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  async hash(password: string): Promise<string> {
    return await hash(password, 12);
  }
}
