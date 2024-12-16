import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener todos los usuarios");
};

export const getUserById = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener un usuario por su ID");
};

export const registerUser = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para registrar un usuario");
};

export const loginUser = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para loguear un usuario");
};
