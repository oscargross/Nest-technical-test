import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    name: string;

    @Column({ length: 120 })
    email: string;

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
    }
}
