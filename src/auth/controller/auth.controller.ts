import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
    UseJwtRefreshAuthGuard,
    UseLocalAuthGuard,
    UseKakaoAuthGuard,
} from '../guard';
import { AuthService } from '../service/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '@src/modules/user/dto/user.dto';

export interface RequestWithUser extends Request {
    user: UserDto;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @UseLocalAuthGuard()
    @Post('sign-in')
    async signIn(@Req() req: RequestWithUser) {
        const tokenCookies = this.authService.generateTokenCookies(req.user);
        req.res!.setHeader('Set-Cookie', [...tokenCookies]);
        return req.user;
    }

    @UseKakaoAuthGuard()
    @Get('kakao')
    async kakaoLogin(@Req() req: RequestWithUser, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.getJWT(
            req,
        );
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.cookie('isLoggedIn', true, { httpOnly: false });
        return res.redirect(this.configService.get('CLIENT_URL') || '');
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
