import { AuthService } from './auth.service';
import { User as UserEntity } from '../users/entities/user.entity';
type User = Omit<UserEntity, 'password'>;
interface AuthenticatedRequest extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: AuthenticatedRequest): {
        access_token: string;
    };
}
export {};
