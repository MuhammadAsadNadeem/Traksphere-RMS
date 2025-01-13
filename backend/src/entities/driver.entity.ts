import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    fullName: string;

    @Column({ unique: true, nullable: false })
    CnicNumber: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    routeNumber: string;

    @Column({ unique: true, nullable: true })
    busNumber: string;

    @Column({ type: "simple-array", nullable: true })
    stopName: string[];

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
