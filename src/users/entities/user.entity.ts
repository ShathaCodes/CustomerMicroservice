import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../generics/db/timestamp.entity';

@Entity('user')
export class User extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail() 
  @Column({ unique: true })
  email: string;

  @OneToMany((targetEntity) => Product, (product) => product.user, {})
  products: Product[];

 
}