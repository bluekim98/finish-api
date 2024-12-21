import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Branch } from '../../branch/entity/branch.entity';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name', length: 100 })
    name: string;

    @Column({ name: 'address', length: 255 })
    address: string;

    @Column({ name: 'phone_number', length: 20 })
    phoneNumber: string;

    @Column({ name: 'manager_name', type: 'varchar', length: 255 })
    managerName: string;

    @Column({ name: 'manager_phone_number', type: 'varchar', length: 20 })
    managerPhoneNumber: string;

    @Column({ name: 'open_date', type: 'date' })
    openDate: Date;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    // 회사와 지점의 관계 (1:N)
    @OneToMany(() => Branch, (branch) => branch.company)
    branches: Branch[];
}
