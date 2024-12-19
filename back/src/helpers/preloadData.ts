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
        return console.log(
          "Users data preload failed, data already preloaded."
        );

      for await (const user of preloadUsers) {
        const newUser = await UserModel.create(user);
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
      const newAppointment = await AppointmentModel.create(appointment);
      await queryRunner.manager.save(newAppointment);

      const user = await UserModel.findOneBy({ id: appointment.userId });
      if (!user) throw new Error(`User with id ${appointment.userId} does not exist`);

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
