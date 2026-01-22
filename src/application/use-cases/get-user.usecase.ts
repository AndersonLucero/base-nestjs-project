import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { TOKENS } from '../../shared/constants/tokens';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) { }

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
