import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity({
    name: "services",
})
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @OneToOne(() => Appointment, (appointment) => appointment.service)
    appointment: Appointment
}