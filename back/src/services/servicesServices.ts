import { Service } from "../entities/Services";
import ServiceRepository from "../repositories/ServiceRepository";

// GET ALL SERVICES
export const getServicesService = async (): Promise<Service[]> => {
    const services = await ServiceRepository.find();
    return services;
}

// GET SERVICE BY ID
export const getServiceByIdService = async (id: number): Promise<Service | null> => {
    const service = await ServiceRepository.findOneBy({ id });
    return service;
}

// CREATE SERVICE
export const createServiceService = async (serviceData: Service): Promise<Service> => {
    const service = await ServiceRepository.save(serviceData);
    return service;
}