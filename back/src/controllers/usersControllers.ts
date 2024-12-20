import { Request, Response } from "express";
import { User } from "../entities/User";
import {
  registerUserService,
  getUserByIdService,
  getUsersService,
} from "../services/usersServices";

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: User | null = await getUserByIdService(Number(id));
  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, birthdate, nDni } = req.body;
  const newUser: User = await registerUserService({
    name,
    email,
    password,
    birthdate,
    nDni,
  });
  res.status(201).json(newUser);
};