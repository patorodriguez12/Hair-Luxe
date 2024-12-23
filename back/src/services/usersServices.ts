import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
const bcrypt = require("bcrypt");

// GET ALL USERS SERVICE
export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({ relations: ["appointments"] });
  return users;
};

// GET USER BY ID SERVICE
export const getUserByIdService = async (id: number): Promise<User | null> => {
  // find user by id with appointments relation
  const user = await UserRepository.findOne({
    where: { id },
    relations: ["appointments"],
  });

  // check if the id exists
  if (!user) {
    throw new Error(`User with id ${id} not exists`);
  }
  return user;
};

// REGISTER USER SERVICE
export const registerUserService = async (userData: UserDto) => {
  // check if email already exists
  const existingUser = await UserRepository.findOneBy({
    email: userData.email,
  });

  // if email exists, throw error
  if (existingUser) {
    throw new Error(`User with email ${userData.email} already exists.`);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // create user with hashed password
  const newUser = UserRepository.create({
    ...userData,
    password: hashedPassword,
  });
  const result = await UserRepository.save(newUser);
  return result;
};

// LOGIN USER SERVICE
export const loginUserService = async (
  email: string,
  password: string
): Promise<User | null> => {
  // search user by email
  const user = await UserRepository.findOne({
    where: { email: email },
    relations: ["appointments"],
  });

  // if user not found, throw error
  if (!user) {
    throw new Error(`User with email ${email} does not exists.`);
  }

  // check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // if password is incorrect, throw error
  if (!isPasswordValid) {
    throw new Error("Incorrect password");
  }

  return user;
};
