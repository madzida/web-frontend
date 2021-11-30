import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Station } from "./Station";
import { Ticket } from "./Ticket";

@Entity()
export class TrainRoute {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("timestamp")
    departureTime!: Date;

    @Column("timestamp")
    arrivalTime!: Date;

    @ManyToMany(type => Station)
    @JoinTable()
    stations!: Station[];

    @Column("int")
    trainId!: number;
}