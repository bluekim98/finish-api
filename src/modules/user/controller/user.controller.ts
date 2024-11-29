import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UseJwtAuthGuard } from '@src/auth/guard';
import { RequestWithUser } from '@src/auth/controller/auth.controller';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('kakao')
    async createKakaoUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseJwtAuthGuard()
    @Get('me')
    async me(@Req() req: RequestWithUser) {
        return req.user;
    }
}
