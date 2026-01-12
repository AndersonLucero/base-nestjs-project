import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
