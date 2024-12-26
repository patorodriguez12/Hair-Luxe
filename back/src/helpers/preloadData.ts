import { AppDataSource } from "../config/data-source";
import { appointmentData } from "./appointmentData";
import { userData } from "./userData";
import { servicesData } from "./serviceData";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import ServiceRepository from "../repositories/ServiceRepository";
const bcrypt = require("bcrypt");
const preloadUsers = userData;
const preloadAppointments = appointmentData;
const preloadServices = servicesData;

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserRepository.find();
      if (users.length)
        return console.log(
          "Users data preload failed, data already preloaded."
        );

      for await (const user of preloadUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await UserRepository.create({
          ...user,
          password: hashedPassword,
        });
        await transactionalEntityManager.save(newUser);
      }

      console.log("Users data preload success.");
    }
  );
};

export const preloadServicesData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const services = await ServiceRepository.find();
      if (services.length) {
        return console.log(
          "Services data preload failed, data already preloaded."
        );
      }

      for (const service of preloadServices) {
        const newService = ServiceRepository.create(service);
        await transactionalEntityManager.save(newService);
      }

      console.log("Services data preload success.");
    }
  );
};

export const preloadAppointmentsData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const appointments = await AppointmentRepository.find();
      if (appointments.length) {
        return console.log(
          "Appointments data preload failed, data already preloaded."
        );
      }

      for (const appointment of preloadAppointments) {
        const user = await UserRepository.findOneBy({ id: appointment.userId });
        if (!user) {
          throw new Error(`User with id ${appointment.userId} does not exist`);
        }

        const service = await ServiceRepository.findOneBy({
          id: appointment.serviceId,
        });
        if (!service) {
          throw new Error(
            `Service with id ${appointment.serviceId} does not exist`
          );
        }

        const newAppointment = AppointmentRepository.create({
          ...appointment,
          user,
          service,
        });

        await transactionalEntityManager.save(newAppointment);
      }

      console.log("Appointments data preload success.");
    }
  );
};
