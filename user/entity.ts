import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  //   BeforeInsert,
  UpdateDateColumn,
} from "typeorm";
import { RoleFormat } from "./enums";
import { Product } from "../product/entity";
import { IsEmail } from "class-validator";
import bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

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

  @OneToMany(() => Product, (product) => product.user) // note: we will create author property in the Photo class below
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
