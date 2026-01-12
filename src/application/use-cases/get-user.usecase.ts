import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) { }

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
