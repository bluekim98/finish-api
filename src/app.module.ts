import { Module } from '@nestjs/common';
import { UtilsModule } from './utils/utils.module';
import { DatabaseModule } from '@src/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [UtilsModule, DatabaseModule, UserModule, AuthModule],
})
export class AppModule {}
