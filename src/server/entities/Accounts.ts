import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Accounts extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

}