import { Injectable } from '@nestjs/common';
import { User } from '@src/modules/user/entity/user.entity';
import { DataSource, Repository, BaseEntity } from 'typeorm';
import { ExceptionCode } from '@src/common/enums/exception-code.enum';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findOneByPhoneNumberOrFail(phoneNumber: string): Promise<User> {
        const user = await this.findOneBy({ phoneNumber });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
            };
        return user;
    }

    async findOneByEmailOrFail(email: string): Promise<User> {
        const user = await this.findOneBy({ email });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
            };
        return user;
    }

    async findOneByKakaoIdOrFail(kakaoId: number): Promise<User> {
        const user = await this.findOneBy({ kakaoId });
        if (!user)
            throw {
                code: ExceptionCode.USER_NOT_FOUND,
            };
        return user;
    }
}
