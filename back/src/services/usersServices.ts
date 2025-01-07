import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// GET ALL USERS SERVICE
export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({
    relations: ["appointments", "appointments.service"],
  });
  return users;
};

// GET USER BY ID SERVICE
export const getUserByIdService = async (id: number): Promise<User | null> => {
  // find user by id with appointments relation
  const user = await UserRepository.findOne({
    where: { id },
    relations: ["appointments", "appointments.service"],
  });

  // check if the id exists
  if (!user) {
    throw new Error(`Usuario con el id ${id} no existe.`);
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
): Promise<{ user: User; token: string } | null> => {
  // search user by email
  const user = await UserRepository.findOne({
    where: { email: email },
    relations: ["appointments", "appointments.service"],
  });

  // if user not found, throw error
  if (!user) {
    throw new Error(`No encontramos una cuenta con el email ${email} registrado.`);
  }

  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta.");
  }

  // generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { user, token };
};
