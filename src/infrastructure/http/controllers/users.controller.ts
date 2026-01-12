import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  CreateUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUsersUseCase,
} from '../../../application/use-cases';
import { CreateUserDto, UpdateUserDto } from '../../../application/dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }


  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @Get()
  async findAll() {
    return this.listUsersUseCase.execute();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({ status: 200, description: 'Return the user details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }


  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }


  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
