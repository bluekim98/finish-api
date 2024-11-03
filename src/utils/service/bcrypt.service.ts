import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
    private static readonly rounds = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, BcryptService.rounds);
    }

    async compare(password: string, encodedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, encodedPassword);
    }
}
