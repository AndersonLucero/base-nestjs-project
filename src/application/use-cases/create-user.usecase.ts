import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories';
import { CreateUserDto } from '../dto';
import { UserAlreadyExistsException } from '../../domain/exceptions';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) { }

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(dto.email);
    }

    const hashedPassword = await bcrypt.hash(dto.password!, 10);
    const id = crypto.randomUUID();
    const newUser = new User(id, dto.name, dto.email, hashedPassword);

    return this.userRepository.save(newUser);
  }
}
