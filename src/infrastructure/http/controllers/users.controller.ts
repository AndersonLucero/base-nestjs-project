import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase, GetUserUseCase } from '../../../application/use-cases';
import { CreateUserDto } from '../../../application/dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }
}
