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
  fullname: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  departmentName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  busNumber: string;

  @Column({ nullable: true })
  stopAddress: string;

  @Column({ nullable: true })
  profile_image: string;


  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
