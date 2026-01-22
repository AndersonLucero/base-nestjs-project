import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';
import { TOKENS } from '../../shared/constants/tokens';

@Injectable()
export class ListUsersUseCase {
    constructor(
        @Inject(TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
