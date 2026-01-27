import { Global, Module } from '@nestjs/common';
import { IHashProvider } from 'src/shared/application/providers/hash.provider';
import { BcryptHashProvider } from '../../providers/bcrypt.hash.provider';
import { INodemailerProvider } from 'src/shared/application/providers/nodemailer.provider';
import { NestNodemailerProvider } from '../../providers/nest.nodemailer.provider';
import { ITemplatesProvider } from 'src/shared/application/providers/templates.provider';
import { NestTemplatesProvider } from '../../providers/nest.templates.provider';
import { JwtModule } from '@nestjs/jwt';
import { IJwtProvider } from 'src/shared/application/providers/jwt.provider';
import { NestJwtProvider } from '../../providers/nest.jwt.provider';
import { ConfigService } from '@nestjs/config';
import { IDayJsProvider } from 'src/shared/application/providers/dayjs.provider';
import { NestDayJsProvider } from '../../providers/nest.dayjs.provider';
import { ICompareProvider } from 'src/shared/application/providers/compare.provider';
import { BcryptCompareProvider } from '../../providers/bcrypt.compare.provider';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configEnv: ConfigService) => ({
        secret: configEnv.get<string>('JWTSECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  providers: [
    { provide: IHashProvider, useClass: BcryptHashProvider },
    { provide: INodemailerProvider, useClass: NestNodemailerProvider },
    { provide: ITemplatesProvider, useClass: NestTemplatesProvider },
    { provide: IJwtProvider, useClass: NestJwtProvider },
    { provide: IDayJsProvider, useClass: NestDayJsProvider },
    { provide: ICompareProvider, useClass: BcryptCompareProvider },
  ],
  exports: [
    IHashProvider,
    INodemailerProvider,
    ITemplatesProvider,
    IJwtProvider,
    IDayJsProvider,
    ICompareProvider,
  ],
})
export class SharedModule {}
