import { Request, Response } from "express";
import { scheduleAppointmentService } from "../services/appointmentsServices";

export const getAppointments = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener todos los appointments");
};

export const getAppointmentById = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para obtener un appointment especifico");
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  const { userId, date, time, status } = req.body;

  try {
    const newAppointment = await scheduleAppointmentService(userId, {
      date,
      time,
      status,
    });
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  res.status(200).json("Endpoint para cancelar un appointment");
};
