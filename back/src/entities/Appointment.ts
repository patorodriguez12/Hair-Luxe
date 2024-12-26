import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Service } from "./Services";

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.appointments, { onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => Service, (service) => service.appointment, { onDelete: "CASCADE" })
  service: Service;
}
