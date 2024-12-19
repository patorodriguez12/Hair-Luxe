import {
  AppDataSource,
  AppointmentModel,
  UserModel,
} from "../config/data-source";
import { appointmentData } from "./appointmentData";
import { userData } from "./userData";

const preloadUsers = userData;
const preloadAppointments = appointmentData;

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserModel.find();
      if (users.length)
        return console.log("Users data preload failed, data already preloaded.");

      for await (const user of preloadUsers) {
        const newUser = await UserModel.create(user);
        await transactionalEntityManager.save(newUser);
      }

      console.log("Users data preload success.");
    }
  );
};

export const preloadAppointmentsData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
        const appointments = await AppointmentModel.find();
        if (appointments.length) 
            return console.log("Appointments data preload failed, data already preloaded.")
      for await (const appointment of preloadAppointments) {
        const newAppointment = await AppointmentModel.create(appointment);
        await transactionalEntityManager.save(newAppointment);
        const user = await UserModel.findOneBy({ id: appointment.userId });
        if (user) {
          newAppointment.user = user;
          transactionalEntityManager.save(newAppointment);
        } else {
          console.log("Appointment creation error");
        }
      }

      console.log("Appointments data preload success.");
    }
  );
};
