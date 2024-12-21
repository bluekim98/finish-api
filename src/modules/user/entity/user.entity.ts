import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Branch } from '../../branch/entity/branch.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint',
    })
    readonly id?: number;

    // 회원과 지점의 관계(N-1)
    @ManyToOne(() => Branch, (branch) => branch.users, { nullable: true })
    branch?: Branch; // FK - 지점 ID

    // 매니저(User)와 지점(Branch)의 관계 (1:N)
    @OneToMany(() => Branch, (branch) => branch.manager)
    managedBranches?: Branch[];

    @Column({ name: 'name', type: 'varchar', nullable: true })
    readonly name: string;

    @Column({ name: 'email', type: 'varchar', nullable: true })
    readonly email: string;

    @Column({ name: 'level', type: 'varchar', nullable: true })
    readonly level: string;

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
        name: 'registed_at',
    })
    // set now
    readonly registeredAt?: Date;

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
