import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
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

  @ManyToOne(() => Service, (service) => service.appointments, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  service: Service;
}
