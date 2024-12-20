import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({ relations: ["appointments"] });
  return users;
};

export const registerUserService = async (userData: UserDto) => {
  const existingUser = await UserRepository.findOneBy({
    email: userData.email,
  });
  if (existingUser) {
    throw new Error(`User with email ${userData.email} already exists.`);
  }

  const newUser = UserRepository.create(userData);
  const result = await UserRepository.save(newUser);
  return result;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserRepository.findOneBy({
    id,
  });
  if (!user) {
    throw new Error(`User with id ${id} not exists`);
  }
  return user;
};
