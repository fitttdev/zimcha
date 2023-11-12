import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersRepository } from './users/users.repository';
import { UserDocument, UserSchema } from './users/models/user.schema';
import { UsersService } from './users/users.service';
import { DbModule } from '@app/common';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    DbModule.forFeature(
      [
        { name: UserDocument.name, schema: UserSchema }
      ]
    ),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}`
        }
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        PORT: Joi.number().required(),
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
})
export class AuthModule { }
