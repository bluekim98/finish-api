import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Like } from 'typeorm';
import { User } from '@src/modules/user/entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { BcryptService } from '@src/common/utils/service/bcrypt.service';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
    ) {}

    async create(createUserDto: CreateUserDto, device: string) {
        const encryptedPassword = createUserDto.password
            ? await this.bcryptService.hash(createUserDto.password)
            : '';

        const user: User = {
            name: createUserDto.name,
            email: createUserDto.email,
            level: createUserDto.level,
            device: device,
            phoneNumber: createUserDto.phoneNumber,
            password: encryptedPassword,
            kakaoId: createUserDto.kakaoId,
            provider: createUserDto.provider,
        };

        return await this.userRepository
            .save(user)
            .then((user) => this.toDto(user));
    }

    async existsUser(condition: FindUserDto) {
        const isEmtpy = Array.from(Object.keys(condition)).every(
            (key) => !(condition as Record<string, any>)[key],
        );
        if (isEmtpy) return;

        const user = await this.findOneBy(condition);
        if (user) {
            return this.toDto(user);
        }
    }

    async findOneBy(condition: FindUserDto) {
        return await this.userRepository.findOneBy(condition);
    }

    async findOneByPhoneNumber(phoneNumber: string) {
        return await this.userRepository
            .findOneByPhoneNumberOrFail(phoneNumber)
            .then((user) => this.toDto(user));
    }

    async findOneByEmail(email: string) {
        return await this.userRepository
            .findOneByEmailOrFail(email)
            .then((user) => this.toDto(user));
    }
    async findOneByKakaoId(kakaoId: number) {
        return await this.userRepository
            .findOneByKakaoIdOrFail(kakaoId)
            .then((user) => this.toDto(user));
    }

    async findLikePhoneNumber(phoneNumber: string) {
        const users = await this.userRepository.findBy({
            phoneNumber: Like(phoneNumber),
        });

        return users.map((user) => this.toDto(user));
    }

    toDto(user: User): UserDto {
        return {
            id: user.id!,
            name: user.name,
            level: user.level,
            email: user.email,
            device: user.device,
            provider: user.provider,
            phoneNumber: user.phoneNumber,
            registeredAt: user.registeredAt!,
            createdAt: user.createdAt!,
            updatedAt: user.updatedAt!,
            kakaoId: user.kakaoId,
        };
    }
}
