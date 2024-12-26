import AppointmentsDto from "../dto/AppointmentsDto";
import { Appointment } from "../entities/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import ServiceRepository from "../repositories/ServiceRepository";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentRepository.find({
    relations: ["user", "service"],
  });
  return appointments;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = AppointmentRepository.findOne({
    where: { id },
    relations: ["user", "service"],
  });
  return appointment;
};

export const scheduleAppointmentService = async (
  userId: number,
  serviceId: number,
  appointmentData: AppointmentsDto
) => {
  const user = await UserRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const service = await ServiceRepository.findOneBy({ id: serviceId });
  if (!service) {
    throw new Error("Service not found");
  }

  const newAppointment = AppointmentRepository.create({
    ...appointmentData,
    user,
    service,
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
