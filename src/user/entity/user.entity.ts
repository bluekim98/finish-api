import { parseNumber } from '@src/utils/transformer';
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

    @Column({ name: 'name', type: 'varchar', nullable: false })
    readonly name: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    readonly phoneNumber: string;

    @Column({ name: 'password', type: 'varchar', nullable: false })
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
    readonly updatedAt?: Date;
}
