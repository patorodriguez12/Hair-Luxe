import AppointmentsDto from "../dto/AppointmentsDto";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentRepository.find({
    relations: ["user"],
  });
  return appointments;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = AppointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });
  return appointment;
};

export const scheduleAppointmentService = async (
  userId: number,
  appointmentData: AppointmentsDto
) => {
  const user = await UserRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newAppointment = AppointmentRepository.create({
    ...appointmentData,
    user,
  });

  const result = AppointmentRepository.save(newAppointment);
  return result;
};

export const cancelAppointmentService = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = await AppointmentRepository.findOneBy({ id });
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = "cancelled";
  const updatedAppointment = await AppointmentRepository.save(appointment);

  return updatedAppointment;
};
