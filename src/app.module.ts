import { Module } from '@nestjs/common';
import { UtilsModule } from './common/utils/utils.module';
import { DatabaseModule } from '@src/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UtilsModule,
        DatabaseModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
        }),
    ],
})
export class AppModule {}
