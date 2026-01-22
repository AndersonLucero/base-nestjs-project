import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { CreateUserDto } from '../dto';
import { UserAlreadyExistsException } from '../../domain/exceptions';
import { TOKENS } from '../../shared/constants/tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY)
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
