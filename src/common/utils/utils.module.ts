import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from './service/bcrypt.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: 'config/.env', isGlobal: true }),
    ],
    providers: [BcryptService],
    exports: [BcryptService],
})
export class UtilsModule {}
