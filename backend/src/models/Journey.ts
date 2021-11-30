import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { SensorData } from "./SensorData";
import { Station } from "./Station";
import { TrainRoute } from "./TrainRoute";

@Entity()
export class Journey {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => TrainRoute)
    @JoinColumn()
    trainRoute!: TrainRoute;

    @Column("timestamp")
    departureTime!: Date;

    @Column("timestamp")
    arrivalTime!: Date;

    @Column("numeric")
    price!: number;

    @ManyToOne(type => Station)
    @JoinColumn()
    departureStation!: Station;

    @ManyToOne(type => Station)
    @JoinColumn()
    arrivalStation!: Station;

    @ManyToOne(type => SensorData)
    @JoinColumn()
    sensorData!: SensorData;
}