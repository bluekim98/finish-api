import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@src/modules/user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {
                expiresIn: Number(process.env.JWT_ACCESS_EXPIRES),
            },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        KakaoStrategy,
        JwtRefreshStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
