import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUserService, getUsersService } from "../services/usersServices";

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener un usuario por su ID");
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, birthdate, nDni, credentialsId } = req.body;
  const newUser: User = await createUserService({
    name,
    email,
    birthdate,
    nDni,
    credentialsId,
  });
  res.status(201).json(newUser); 
};

export const loginUser = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para loguear un usuario");
};
