import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IAuthUserDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio!' })
  password: string;
}
