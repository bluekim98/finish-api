import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UseKakaoAuthGuard } from '@src/auth/guard';
import { RequestWithUser } from '@src/auth/controller/auth.controller';
import { detectDevice } from '@src/common/utils/device-detector.util';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(
        @Req() req: Request,
        @Body() createUserDto: CreateUserDto,
    ) {
        const device = detectDevice(req);
        return await this.userService.create(createUserDto, device);
    }

    @UseKakaoAuthGuard()
    @Get('kakao')
    async kakao(@Req() req: RequestWithUser) {
        return req.user;
    }

    @Get('me')
    async me(@Req() req: RequestWithUser) {
        return req.user;
    }
}
