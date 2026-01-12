import { Module } from '@nestjs/common';
import { UsersController } from '../infrastructure/http/controllers/users.controller';
import { CreateUserUseCase, GetUserUseCase } from '../application/use-cases';
import { USER_REPOSITORY } from '../domain/repositories';
import { PrismaUserRepository } from '../infrastructure/database/postgres/repositories/prisma-user.repository';
import { PrismaService } from '../infrastructure/database/postgres/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule { }
