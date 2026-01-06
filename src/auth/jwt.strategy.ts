// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // take token from Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // if the token is expired, reject it
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret', // 3. Use secret from .env to verify signature
    });
  }

  // 4. If token is valid, this function will run and return user data
  async validate(payload: any) {
    // The returned value here will be automatically assigned to "request.user"
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}