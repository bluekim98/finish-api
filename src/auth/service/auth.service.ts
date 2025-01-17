import { Injectable } from '@nestjs/common';
import { UserService } from '@src/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from '@src/common/utils/service/bcrypt.service';
import { User } from '@src/modules/user/entity/user.entity';
import { UserDto } from '@src/modules/user/dto/user.dto';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';
import { RequestWithUser } from '@src/auth/controller/auth.controller';

export enum TokenType {
    JWT_ACCESS_TOKEN = 'Authentication',
    JWT_REFRESH_TOKEN = 'Refresh',
}

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly bcryptService: BcryptService,
    ) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<User | undefined> {
        const user = await this.userService.findOneBy({ email });
        if (!user) return;
        if (!user.password) {
            return;
        }

        const isCompare = await this.bcryptService.compare(
            password,
            user.password,
        );

        return isCompare ? user : undefined;
    }

    generateTokenCookies(user: UserDto): string[] {
        const accessTokenCookie = this.generateJwtAccessTokenCookie(user);
        const refreshTokenCookie = this.generateJwtRefreshTokenCookie(user);

        return [accessTokenCookie, refreshTokenCookie];
    }

    generateJwtAccessTokenCookie(user: UserDto): string {
        const token = this.generateJwtAccessToken(user);
        return this.getCookieByToken(TokenType.JWT_ACCESS_TOKEN, token);
    }

    generateJwtRefreshTokenCookie(user: UserDto): string {
        return this.getCookieByToken(
            TokenType.JWT_REFRESH_TOKEN,
            this.generateRefreshToken(user),
        );
    }

    generateJwtAccessToken(user: UserDto): string {
        const payload = { sub: user.id, username: user.name };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: Number(process.env.JWT_ACCESS_EXPIRES),
        });
        return token;
    }

    generateRefreshToken(user: UserDto): string {
        const payload = { sub: user.id, username: user.name };
        console.log(this.configService.get('JWT_REFRESH_SECRET'));
        console.log(Number(process.env.JWT_REFRESH_EXPIRES));
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: Number(process.env.JWT_REFRESH_EXPIRES),
        });
        return token;
    }

    getCookieByToken(type: TokenType, token: string): string {
        let expiresConfigTitle: string;
        switch (type) {
            case TokenType.JWT_ACCESS_TOKEN:
                expiresConfigTitle = 'JWT_ACCESS_EXPIRES';
                break;
            case TokenType.JWT_REFRESH_TOKEN:
                expiresConfigTitle = 'JWT_REFRESH_EXPIRES';
                break;
        }
        const maxAge = this.configService.get<number>(expiresConfigTitle);

        return `${type}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}`;
    }

    async getJWT(req: RequestWithUser) {
        const user: UserDto = req.user;
        const device: string = req.header('user-agent') || '';
        const kakaoUser = await this.kakaoValidateUser(user, device); // 카카오 정보 검증 및 회원가입 로직
        const accessToken = this.generateJwtAccessToken(kakaoUser); // AccessToken 생성
        const refreshToken = await this.generateRefreshToken(kakaoUser); // refreshToken 생성
        return { accessToken, refreshToken };
    }

    async kakaoValidateUser(user: UserDto, device: string): Promise<UserDto> {
        try {
            if (!user.email) {
                throw new Error('Email is required');
            }
            return await this.userService.findOneByEmail(user.email);
        } catch (error) {
            if (error.code === ExceptionCode.USER_NOT_FOUND) {
                return await this.userService.create(
                    {
                        ...user,
                        password: '',
                    },
                    device,
                );
            }
            throw error;
        }
    }
}
