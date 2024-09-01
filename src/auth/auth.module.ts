import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    // PassportModule is used to manage the authentication strategies.
    PassportModule,

    // JwtModule is used to handle JWT operations.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // Secret key for signing JWT tokens
        secret: configService.get<string>('JWT_SECRET'),
        // JWT token expiration time
        signOptions: { expiresIn: '60m' },
      }),
    }),

    // ConfigModule is used to manage application configurations.
    ConfigModule.forRoot(),

    // UsersModule provides user-related services and data.
    UsersModule,
  ],

  // AuthService and JwtStrategy are provided as part of this module.
  providers: [AuthService, JwtStrategy],

  // AuthController is used to handle authentication-related HTTP requests.
  controllers: [AuthController],
})
export class AuthModule {}
