import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from '../../../application/use-cases/login.usecase';
import { LoginDto } from '../../../application/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login to get JWT access token' })
    @ApiResponse({ status: 200, description: 'Return the access token' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }
}
