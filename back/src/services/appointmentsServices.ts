import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentsDto from "../dto/AppointmentsDto";
import { Appointment } from "../entities/Appointment";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentModel.find();
  return appointments;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment | null> => {
  const appointment = AppointmentModel.findOneBy({
    id,
  });
  return appointment;
};

export const scheduleAppointmentService = async (
  userId: number,
  appointmentData: AppointmentsDto
) => {
  const user = await UserModel.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newAppointment = AppointmentModel.create({
    ...appointmentData,
    user,
  });

  const result = AppointmentModel.save(newAppointment);
  return result;
};
