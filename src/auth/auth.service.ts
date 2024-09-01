import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // The number of salt rounds for bcrypt hashing.
  private readonly saltRounds = 10;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user by checking the provided email and password against the stored user data.
   *
   * @param email - The user's email address.
   * @param pass - The user's password.
   * @returns The user data excluding the password if valid; otherwise, null.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Retrieves the profile information of the user by their email.
   *
   * @param email - The user's email address.
   * @returns The user object corresponding to the provided email.
   */
  async profile(email: string) {
    return await this.userService.findOneByEmail(email);
  }

  /**
   * Logs in a user by validating their email and password, and returns a JWT token.
   *
   * @param user - An object containing email and password.
   * @returns An object containing the access_token (JWT) if the user is successfully authenticated.
   * @error ConflictException if the email or password is invalid.
   */
  async login(user: any) {
    const findUser = await this.userService.findOneByEmail(user.email);

    // Check if user exists and password is correct
    if (
      !findUser ||
      !(await bcrypt.compare(user.password, findUser.password))
    ) {
      throw new ConflictException('Invalid email or password');
    }

    // Create JWT payload
    const payload = { email: user.email, sub: user._id };

    // Return JWT token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registers a new user by creating their account with the provided email, role, company name, and password.
   *
   * @param email - The user's email address.
   * @param role - The user's role.
   * @param companyName - The name of the company associated with the user.
   * @param password - The user's password.
   * @returns The created user object.
   * @error ConflictException if the email already exists.
   */
  async register(
    email: string,
    role: string,
    companyName: string,
    password: string,
  ) {
    const findUser = await this.userService.findOneByEmail(email);

    if (findUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return await this.userService.create({
      email,
      companyName,
      role,
      password: hashedPassword,
    });
  }
}
