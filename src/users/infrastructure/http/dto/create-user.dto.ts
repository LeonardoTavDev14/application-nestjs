import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ICreateUserDTO {
  @MinLength(3, { message: 'O nome deve conter mais de dois caracteres!' })
  @IsString()
  @IsNotEmpty({ message: 'O campo de nome não pode estar vazio!' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio!' })
  email: string;

  @MinLength(8, { message: 'A senha deve conter mais de oito caracteres!' })
  @IsString()
  @IsNotEmpty({ message: 'O campo de senha não pode estar vazio!' })
  password: string;
}
