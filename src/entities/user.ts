import 'reflect-metadata';
import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Campaign } from "./campaign";


@Entity({ name: 'user', schema: 'public' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {unique: true}, )
    email: string;

    @Column("varchar")
    name: string;

    @Column("varchar",{nullable:true})
    occupation: string;

    @Column("varchar")
    password: string;

    @Column("varchar", {nullable:true})
    avatar_filename: string;

    @Column("varchar",{nullable:true, default:"user"})
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Campaign, campaign => campaign.user, {
        createForeignKeyConstraints: false
    })
    @JoinColumn({
        referencedColumnName: 'user_id',
        name: 'id'
    })
    campaigns: Campaign[];

}
