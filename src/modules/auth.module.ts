import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './users.module';
import { AuthController } from '../infrastructure/http/controllers/auth.controller';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { JwtStrategy } from '../infrastructure/auth/strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'secretKey', // In production, use environment variable
            signOptions: { expiresIn: '60m' },
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, JwtStrategy],
    exports: [LoginUseCase],
})
export class AuthModule { }
