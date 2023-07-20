import { AppDataSource } from "../app";
import { Product } from "./entity";
import { User } from "../user/entity";
import { IProduct } from "./interface";

class ProductService {
  public async createOneProduct(input: IProduct, userId: string) {
    const {
      name,
      price,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
    } = input;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });

    if (user) {
      const product = new Product();
      product.name = name;
      product.price = price;
      product.category = category;
      product.company = company;
      product.colors = colors;
      product.featured = featured;
      product.freeShipping = freeShipping;
      product.inventory = inventory;
      product.user = user;

      await AppDataSource.getRepository(Product).save(product);
      return product;
    }

    return undefined;

    // await
  }
}

export const productService = new ProductService();
