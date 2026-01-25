import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/users/application/usecases/create-user.use-case';
import { ICreateUserDTO } from '../dto/create-user.dto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: ICreateUserDTO) {
    try {
      const newUser = await this.createUserUseCase.execute(data);

      return {
        message: 'User created!',
        data: newUser,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
