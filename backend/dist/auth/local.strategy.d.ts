import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
interface User {
    id: number;
    loginId: string;
    email: string;
}
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(loginId: string, password: string): Promise<Omit<User, 'password'> | null>;
}
export {};
