import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DbModule,
    DbModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UserDocument, UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
