import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Journey } from "./Journey";
import { User } from "./User";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => User, user => user.tickets)
    @JoinColumn()
    user!: User;

    @ManyToOne(type => Journey)
    @JoinColumn()
    journey!: Journey;
}