import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Credential {
    @PrimaryGeneratedColumn()
    id: number;
}