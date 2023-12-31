import { AppDataSource } from "../app";
import { Product } from "./entity";
import { User } from "../user/entity";
import { IProduct } from "./interface";

class ProductService {
  public async createOneProduct(input: IProduct, user: User) {
    const {
      name,
      price,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
      description,
    } = input;

    const product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
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

  public async getAllProducts() {
    const products = await AppDataSource.getRepository(Product).find({});
    return products;
  }

  public async getSingleProduct(id: string) {
    const singleProduct = await AppDataSource.getRepository(Product).findOne({
      where: { id: id },
    });
    return singleProduct;
  }

  public async updateProduct(
    product: Product,
    input: Partial<Product>
  ): Promise<Product | null> {
    Object.assign(product, input);
    await AppDataSource.getRepository(Product).save(product);
    return product;
  }

  public async deleteProduct(id: string) {
    await AppDataSource.getRepository(Product).delete(id);
  }
}

export const productService = new ProductService();
