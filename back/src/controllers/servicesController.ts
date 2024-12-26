import { Request, Response } from "express";
import { Service } from "../entities/Services";
import {
  getServicesService,
  getServiceByIdService,
  createServiceService,
} from "../services/servicesServices";

// GET ALL SERVICES
export const getServices = async (req: Request, res: Response) => {
  const services: Service[] = await getServicesService();
  res.status(200).json(services);
};

// GET SERVICE BY ID
export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const service: Service | null = await getServiceByIdService(Number(id));
  res.status(200).json(service);
};

// CREATE SERVICE
export const createService = async (req: Request, res: Response) => {
  const serviceData: Service = req.body;
  const newService: Service = await createServiceService(serviceData);
  res.status(201).json(newService);
};
