import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column({ name: 'manager_name', length: 100 })
    managerName: string;

    @Column({ name: 'manager_phone_number', length: 20 })
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
}
