import { Request, Response } from "express";
import { User } from "../entities/User";
import {
  createUserService,
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
  const newUser: User = await createUserService({
    name,
    email,
    password,
    birthdate,
    nDni,
  });
  res.status(201).json(newUser);
};

export const loginUser = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para loguear un usuario");
};
