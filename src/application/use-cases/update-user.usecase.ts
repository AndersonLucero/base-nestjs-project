import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';
import { UpdateUserDto } from '../dto';
import { User } from '../../domain/entities';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
            // Ideally employ a custom domain exception here, e.g., UserNotFoundException
        }
        return this.userRepository.update(id, updateUserDto);
    }
}
