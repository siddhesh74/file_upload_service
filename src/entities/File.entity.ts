import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import "reflect-metadata";

@Entity()
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  originalName: string;

  @Column()
  storedName: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column({ default: "uploaded" })
  status: "uploaded" | "processing" | "processed" | "failed";

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  uploadedAt: Date;

  @ManyToOne(() => User, (user) => user.email)
  user: User;
}
