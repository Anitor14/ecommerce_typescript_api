import { AppDataSource } from "../app";
import { User } from "./entity";
import { RoleFormat } from "./enums";
import { IUser } from "./interface";

class UserService {
  public async readUser(email: string) {
    // const userRepository = AppDataSource.getRepository(User);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    return user;
  }

  public async isFirstUser(): Promise<boolean> {
    const count = await AppDataSource.getRepository(User).count();
    return count === 0;
  }

  public async createUser(input: IUser) {
    const { email, password, name, role } = input;
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.role = role;

    await AppDataSource.getRepository(User).save(user);
    return user;
  }

  public async getAllUsers() {
    const user = await AppDataSource.getRepository(User).find({
      where: { role: RoleFormat.USER },
      select: ["id", "name", "email"],
    });

    return user;
  }

  public async getSingleUser(id: string) {
    const singleUser = await AppDataSource.getRepository(User).findOne({
      where: { id: id },
      select: ["id", "name", "email"],
    });
    return singleUser;
  }
  public async updateUser(id: string, name: string, email: string) {
    let findUser: IUser | null = await AppDataSource.getRepository(
      User
    ).findOne({
      where: { id },
    });

    if (findUser) {
      findUser.email = email;
      findUser.name = name;
      await AppDataSource.getRepository(User).save(findUser);
      return findUser;
    }
    return undefined;
  }
}

export const userService = new UserService();
