import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { Privilegios } from '../types/user.types';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @Column({ length: 25 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'enum', enum: Privilegios, nullable: false })
    role: Privilegios;
}
