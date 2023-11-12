import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      timestamp: new Date(),
    });
  }

  async users(): Promise<UserDocument[]> {
    return await this.userRepository.find({});
  }

  async verifyUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userRepository.findOne({ email: email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
