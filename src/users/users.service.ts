import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel) {}

  /**
   *  find one by email
   * @param email  - get the email to find user
   * @returns an object containing email and password
   */
  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  /** create user
   * @param user an object containing email and password
   * @returns an object containing email and password
   */

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
