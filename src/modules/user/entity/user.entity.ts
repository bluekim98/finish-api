import { parseNumber } from '@src/common/utils/transformer';
import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    readonly id?: number;

    @Column({ name: 'name', type: 'varchar', nullable: true })
    readonly name: string;

    @Column({ name: 'email', type: 'varchar', nullable: true })
    readonly email: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        nullable: true,
    })
    readonly phoneNumber: string;

    @Column({ name: 'password', type: 'varchar', nullable: true })
    readonly password: string;

    @Column({ name: 'device', type: 'varchar', nullable: true })
    readonly device: string;

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
    readonly updatedAt?: Date;

    @Column({ name: 'kakao_id', type: 'bigint', nullable: true, unique: true })
    readonly kakaoId: number;
    @Column({ name: 'provider', type: 'varchar', nullable: true })
    readonly provider: string;
}
