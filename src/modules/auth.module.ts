import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '60m' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, JwtStrategy],
    exports: [LoginUseCase],
})
export class AuthModule { }
