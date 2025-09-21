import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  username: string;
  sub: number; // Assuming user id is a number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'YOUR_SECRET_KEY', // Should be the same secret as in JwtModule.register
    });
  }

  validate(payload: JwtPayload) {
    // The payload is the decoded JWT. We can trust it here.
    // We could add logic to check if the user still exists, is not banned, etc.
    return { userId: payload.sub, username: payload.username };
  }
}
