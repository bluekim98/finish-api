import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UseKakaoAuthGuard } from '@src/auth/guard';
import { RequestWithUser } from '@src/auth/controller/auth.controller';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseKakaoAuthGuard()
    @Get('kakao')
    async kakao(@Req() req: RequestWithUser) {
        return req.user;
    }

    @Get('me')
    async me(@Req() req: RequestWithUser) {
        console.log('=========== me ============');
        console.log(req.user);
        return req.user;
    }
}
