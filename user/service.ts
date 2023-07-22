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
    const users = await AppDataSource.getRepository(User).find({
      where: { role: RoleFormat.USER },
      select: ["id", "name", "email"],
    });

    return users;
  }

  public async getSingleUser(id: string) {
    const singleUser = await AppDataSource.getRepository(User).findOne({
      where: { id: id },
    });
    return singleUser;
  }
  public async updateUser(user: User, name: string, email: string) {
    user.email = email;
    user.name = name;
    await AppDataSource.getRepository(User).save(user);
    return user;
  }
  public async updateUserPassword(user: User, newPassword: any) {
    user.password = newPassword;
    await AppDataSource.getRepository(User).save(user);
  }
}

export const userService = new UserService();
