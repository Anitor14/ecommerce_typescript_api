import { User } from "../user/entity";

export interface IProduct {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: string[];
  featured: boolean;
  freeShipping: boolean;
  inventory: number;
  numOfReviews?: number;
  user: User;
}
