import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
} from 'class-validator';

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

  @Min(13, { message: 'A idade minima é 13 anos!' })
  @IsNumber()
  @IsNotEmpty({ message: 'O campo de idade não pode estar vazio!' })
  age: number;
}
