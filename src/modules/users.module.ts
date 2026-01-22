import { Module } from '@nestjs/common';
import { UsersController } from '../infrastructure/http/controllers/users.controller';
import {
  CreateUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUsersUseCase,
} from '../application/use-cases';
import { PrismaUserRepository } from '../infrastructure/database/postgres/repositories/prisma-user.repository';
import { PrismaService } from '../infrastructure/database/postgres/prisma/prisma.service';
import { TOKENS } from '../shared/constants/tokens';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetUserUseCase,

    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
    {
      provide: TOKENS.USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    TOKENS.USER_REPOSITORY,
    CreateUserUseCase,
    GetUserUseCase,

    UpdateUserUseCase,
    DeleteUserUseCase,
    ListUsersUseCase,
  ],
})
export class UsersModule { }
