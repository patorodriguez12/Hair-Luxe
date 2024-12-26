import { Service } from "../entities/Services";
import ServiceRepository from "../repositories/ServiceRepository";

export const getServicesService = async (): Promise<Service[]> => {
    const services = await ServiceRepository.find();
    return services;
}