import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}
