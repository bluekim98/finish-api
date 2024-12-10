import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserService } from '@src/modules/user/service/user.service';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '@src/modules/user/dto/user.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private configService: ConfigService,
    ) {
        super({
            // 여기 적어준 정보를 가지고 카카오 서버에 POST /oauth/token 요청이 날아감
            clientID: configService.get('KAKAO_CLIENT_ID'),
            clientSecret: '',
            callbackURL: configService.get('KAKAO_CALLBACK_URL'),
        });
    }

    async validate(
        // POST /oauth/token 요청에 대한 응답이 담김
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: UserDto, info?: any) => void,
    ) {
        try {
            const { _json, provider, username } = profile; //{ id: 0123456789, connected_at: '2023-08-25T10:15:22Z' }
            const user: UserDto = {
                kakaoId: _json.id,
                phoneNumber: _json.kakao_account.profile.phone_number || '',
                name: username || '',
                provider,
                email: _json.kakao_account.email,
                device: '',
                id: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            done(null, user);
        } catch (error) {
            done(error);
        }
    }
}
