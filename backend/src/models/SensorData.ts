import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity()
export class SensorData {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("numeric")
    speed!: number;

    @Column("timestamp")
    time!: Date;

    @Column("json")
    measurements!: string;
}