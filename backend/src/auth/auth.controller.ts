import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity'; // Import User entity and alias it

// Define an interface for the user object that will be attached to the request
// This should match the type returned by AuthService.login
type User = Omit<UserEntity, 'password'>;

// Define an interface for the Request object with the user property
interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
