import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logging.interceptor';
import { TransformInterceptor } from './infrastructure/common/interceptors/transform.interceptor';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule { }
