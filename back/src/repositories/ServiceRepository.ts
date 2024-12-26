import { AppDataSource } from "../config/data-source";
import { Service } from "../entities/Services";

const ServiceRepository = AppDataSource.getRepository(Service);

export default ServiceRepository;
