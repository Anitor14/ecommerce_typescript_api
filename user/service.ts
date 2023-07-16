import { AppDataSource } from "../app";
import { User } from "./entity";
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
}

export const userService = new UserService();
