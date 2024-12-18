import { UserModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find();
  return users;
};

export const createUserService = async (userData: UserDto) => {
  const newUser = UserModel.create(userData);
  const result = await UserModel.save(newUser);
  return result;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserModel.findOneBy({
    id,
  });

  return user;
};
