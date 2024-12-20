import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({ relations: ["appointments"] });
  return users;
};

export const registerUserService = async (userData: UserDto) => {
  const newUser = UserRepository.create(userData);
  const result = await UserRepository.save(newUser);
  return result;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserRepository.findOneBy({
    id,
  });

  return user;
};
