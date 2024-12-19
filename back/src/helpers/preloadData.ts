import { AppDataSource } from "../config/data-source";
import { appointmentData } from "./appointmentData";
import { userData } from "./userData";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";

const preloadUsers = userData;
const preloadAppointments = appointmentData;

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserRepository.find();
      if (users.length)
        return console.log(
          "Users data preload failed, data already preloaded."
        );

      for await (const user of preloadUsers) {
        const newUser = await UserRepository.create(user);
        await transactionalEntityManager.save(newUser);
      }

      console.log("Users data preload success.");
    }
  );
};

export const preloadAppointmentsData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();

    for (const appointment of preloadAppointments) {
      const newAppointment = await AppointmentRepository.create(appointment);
      await queryRunner.manager.save(newAppointment);

      const user = await UserRepository.findOneBy({ id: appointment.userId });
      if (!user)
        throw new Error(`User with id ${appointment.userId} does not exist`);

      const anyAppointment = await AppointmentRepository.find();
      if (anyAppointment.length) throw new Error(`Data already preloaded.`);

      newAppointment.user = user;
      await queryRunner.manager.save(newAppointment);
    }

    await queryRunner.commitTransaction();
    console.log("Appointments data preload success.");
  } catch (error: any) {
    console.error(`Error preloading appointments: ${error.message}`);
    await queryRunner.rollbackTransaction();
  } finally {
    console.log("Preload attempt ended.");
    await queryRunner.release();
  }
};
