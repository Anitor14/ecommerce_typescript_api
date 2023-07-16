import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  //   BeforeInsert,
  UpdateDateColumn,
} from "typeorm";
import { RoleFormat } from "./enums";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    unique: true,
    length: 255,
  })
  @IsEmail()
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  password: string;

  @Column({
    type: "enum",
    enum: RoleFormat,
    default: RoleFormat.USER,
  })
  role: RoleFormat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
