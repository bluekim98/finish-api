import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UseJwtRefreshAuthGuard, UseLocalAuthGuard } from '../guard';
import { AuthService } from '../service/auth.service';
import { User } from '@src/user/entity/user.entity';

export interface RequestWithUser extends Request {
    user: User;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseLocalAuthGuard()
    @Post('sign-in')
    async signIn(@Req() req: RequestWithUser) {
        const tokenCookies = this.authService.generateTokenCookies(req.user);
        req.res!.setHeader('Set-Cookie', [...tokenCookies]);
        return req.user;
    }

    @UseJwtRefreshAuthGuard()
    @Get('refresh')
    async refreshJwtToken(@Req() req: RequestWithUser) {
        const jwtAccessTokenCookie =
            this.authService.generateJwtAccessTokenCookie(req.user);
        req.res!.setHeader('Set-Cookie', [jwtAccessTokenCookie]);
        return req.user;
    }
}
