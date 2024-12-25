import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UseKakaoAuthGuard, UseLocalAuthGuard } from '@src/auth/guard';
import { RequestWithUser } from '@src/auth/controller/auth.controller';
import { FindUserDto } from '../dto/find-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('exists')
    async existsUser(@Body() body: FindUserDto) {
        return await this.userService.existsUser(body);
    }

    @UseKakaoAuthGuard()
    @Get('kakao')
    async kakao(@Req() req: RequestWithUser) {
        return req.user;
    }

    @UseLocalAuthGuard()
    @Get('me')
    async me(@Req() req: RequestWithUser) {
        return req.user;
    }
}
