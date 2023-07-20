import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CategoryFormat, CompanyFormat } from "./enums";

import { User } from "../user/entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: "double precision", nullable: false, default: 0 })
  price: number;

  @Column({ default: "/uploads/example.jp" })
  image: string;

  @Column({ nullable: false, enum: CategoryFormat })
  category: string;

  @Column({ nullable: false, enum: CompanyFormat })
  company: string;

  @Column("text", { array: true, default: ["#222"], nullable: false })
  colors: string[];

  @Column({ type: "boolean", default: false })
  featured: boolean;

  @Column({ type: "boolean", default: false })
  freeShipping: boolean;

  @Column({ type: "int", nullable: false, default: 15 })
  inventory: number;

  @Column({ type: "int", default: 0 })
  numOfReviews: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
