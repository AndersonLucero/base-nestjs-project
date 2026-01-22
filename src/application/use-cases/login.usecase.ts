import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories';
import { LoginDto } from '../dto/login.dto';
import { TOKENS } from '../../shared/constants/tokens';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(dto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password!);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
