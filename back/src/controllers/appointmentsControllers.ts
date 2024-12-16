import { Request, Response } from "express";

export const getAppointments = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener todos los appointments");
};

export const getAppointmentById = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener un appointment especifico");
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para agendar un nuevo appointment");
};

export const cancelAppointment = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para cancelar un appointment");
};
