import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';

@Injectable()
export class ListUsersUseCase {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
