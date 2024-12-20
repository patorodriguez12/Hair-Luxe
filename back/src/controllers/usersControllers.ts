import { Request, Response } from "express";
import { User } from "../entities/User";
import {
  registerUserService,
  getUserByIdService,
  getUsersService,
  loginUserService,
} from "../services/usersServices";

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user: User | null = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, birthdate, nDni } = req.body;

  try {
    const newUser: User = await registerUserService({
      name,
      email,
      password,
      birthdate,
      nDni,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await loginUserService(email, password);
    res.status(200).json({
      login: true,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        birthdate: user?.birthdate,
        nDni: user?.nDni,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
