import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';
import { TOKENS } from '../../shared/constants/tokens';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
