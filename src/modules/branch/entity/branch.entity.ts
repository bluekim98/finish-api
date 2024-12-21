import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Company } from '../../company/entity/company.entity'; // 회사 엔티티
import { User } from '../../user/entity/user.entity'; // 사용자 엔티티

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, (company) => company.branches, {
        nullable: false,
    })
    company: Company;

    @ManyToOne(() => User, (user) => user.managedBranches, { nullable: false })
    manager: User;

    // 지점과 일반 회원의 관계 (1:N)
    @OneToMany(() => User, (user) => user.branch)
    users: User[];

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 500 })
    address: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 20 })
    phoneNumber: string;

    @Column({ type: 'date' })
    openDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
