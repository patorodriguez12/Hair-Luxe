import { Request, Response } from "express";
import {
  cancelAppointmentService,
  getAppointmentByIdService,
  getAppointmentsService,
  scheduleAppointmentService,
} from "../services/appointmentsServices";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response) => {
  const appointments: Appointment[] = await getAppointmentsService();
  res.status(200).json(appointments);
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment: Appointment | null = await getAppointmentByIdService(
    Number(id)
  );
  res.status(200).json(appointment);
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  const { userId, serviceId, date, time } = req.body;

  try {
    const newAppointment = await scheduleAppointmentService(userId, serviceId, {
      date,
      time,
      status: "active",
    });
    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointmentId = Number(id);

    const cancelledAppointment = await cancelAppointmentService(appointmentId);

    res.status(200).json({
      message: `Appointment with id ${id} was cancelled successfully`,
      appointment: cancelledAppointment,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
