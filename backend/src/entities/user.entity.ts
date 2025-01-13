import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ unique: true, nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  departmentName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  routeNumber: string;

  @Column({ nullable: true })
  stopArea: string;


  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
