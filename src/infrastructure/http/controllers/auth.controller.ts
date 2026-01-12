import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.usecase';
import { LoginDto } from '../../../application/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }
}
