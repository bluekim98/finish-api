import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './\brepository/user.repository';
import { DatabaseModule } from '@src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
