import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/modules/user/service/user.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export interface TokenPayload {
    sub: number;
    username: string;
}

const jwtFromRequest: JwtFromRequestFunction = (req) =>
    req?.cookies?.Authentication as string | null;

const refreshFromRequest: JwtFromRequestFunction = (req) =>
    req?.cookies?.Refresh as string | null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([jwtFromRequest]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: TokenPayload) {
        const { sub: userId } = payload;
        const user = await this.userService.findOneBy({ id: userId });
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.userService.toDto(user);
    }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([refreshFromRequest]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: TokenPayload) {
        const { sub: userId } = payload;
        const user = await this.userService.findOneBy({ id: userId });
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.userService.toDto(user);
    }
}
