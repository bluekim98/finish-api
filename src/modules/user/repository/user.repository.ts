import { Injectable } from '@nestjs/common';
import { User } from '@src/modules/user/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    /**
     * ID로 사용자자 조회. 없을 경우 예외 발생.
     * @param id User ID
     * @returns User
     */
    async findByIdOrFail(id: number): Promise<User> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
                message: `User with ID "${id}" not found`,
            };
        }
        return user;
    }

    async findOneByPhoneNumberOrFail(phoneNumber: string): Promise<User> {
        const user = await this.findOneBy({ phoneNumber });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
                message: `User with phone number "${phoneNumber}" not found`,
            };
        return user;
    }

    async findOneByEmailOrFail(email: string): Promise<User> {
        const user = await this.findOneBy({ email });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
                message: `User with email "${email}" not found`,
            };
        return user;
    }

    async findOneByKakaoIdOrFail(kakaoId: number): Promise<User> {
        const user = await this.findOneBy({ kakaoId });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
                message: `User with Kakao ID "${kakaoId}" not found`,
            };
        return user;
    }
}
