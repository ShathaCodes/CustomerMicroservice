import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

@Entity('product')
export class Product extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Type((newType) => Number)
    @Column()
    price: number;

    @Type((newType) => Number)
    @Column()
    quantity: number;

    @ManyToOne(() => User, (user: User) => user.products)
    user: User;

}
