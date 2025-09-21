import { AuthService } from './auth.service';
interface User {
    id: number;
    username: string;
}
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
