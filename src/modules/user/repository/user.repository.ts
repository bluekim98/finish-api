import { Injectable } from '@nestjs/common';
import { User } from '@src/modules/user/entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findOneByPhoneNumberOrFail(phoneNumber: string): Promise<User> {
        const user = await this.findOneBy({ phoneNumber });
        if (!user)
            throw {
                code: 'NOT_FOUND',
            };
        return user;
    }
}
