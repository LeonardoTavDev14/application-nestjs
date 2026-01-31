import { IsEmail, IsNotEmpty } from 'class-validator';

export class IDeleteUserByAdminDTO {
  id: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo de e-mail não pode estar vazio!' })
  email: string;
}
