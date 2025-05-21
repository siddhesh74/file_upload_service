import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { File } from "./File.entity";
import { Task } from "./Task.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
