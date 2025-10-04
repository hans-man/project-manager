import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// This interface can be more specific if needed, but Omit<User, 'password'> covers it
interface User {
  id: number;
  loginId: string;
  email: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'loginId' }); // Changed from 'email' to 'loginId'
  }

  async validate(
    loginId: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> { // Return type should match service
    const user = await this.authService.validateUser(loginId, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}