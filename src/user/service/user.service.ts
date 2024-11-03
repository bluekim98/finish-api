import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Like } from 'typeorm';
import { User } from '@src/user/entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { BcryptService } from '@src/utils/service/bcrypt.service';
import { UserRepository } from '../\brepository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const encryptedPassword = await this.bcryptService.hash(
            createUserDto.password,
        );

        const user: User = {
            name: createUserDto.name,
            phoneNumber: createUserDto.phoneNumber,
            password: encryptedPassword,
        };

        return await this.userRepository
            .save(user)
            .then((user) => this.toDto(user));
    }

    async findOneBy(condition: FindUserDto) {
        return await this.userRepository.findOneBy(condition);
    }

    async findOneByPhoneNumber(phoneNumber: string) {
        return await this.userRepository
            .findOneByPhoneNumberOrFail(phoneNumber)
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
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt!,
            updatedAt: user.updatedAt!,
        };
    }
}
