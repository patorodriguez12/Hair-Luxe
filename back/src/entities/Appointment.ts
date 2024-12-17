import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    status: boolean;
}