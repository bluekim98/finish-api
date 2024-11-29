import { parseNumber } from '@src/common/utils/transformer';
import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @Generated()
    @PrimaryColumn({
        name: 'id',
        type: 'bigint',
        transformer: parseNumber,
    })
    readonly id?: number;

    @Column({ name: 'name', type: 'varchar', nullable: true })
    readonly name: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        nullable: true,
        unique: true,
    })
    readonly phoneNumber: string;

    @Column({ name: 'password', type: 'varchar', nullable: true })
    readonly password: string;

    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'create_at',
    })
    // set now
    readonly createdAt?: Date;

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'update_at',
    })
    @Column({ name: 'kakaoId', type: 'bigint', nullable: true })
    readonly kakaoId: number;
    @Column({ name: 'provider', type: 'varchar', nullable: true })
    readonly provider: string;

    readonly updatedAt?: Date;
}
