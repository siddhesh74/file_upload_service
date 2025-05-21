import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string;

  @Column({ default: "uploaded" })
  status: "uploaded" | "processing" | "processed" | "failed";

  @Column({ type: "json", nullable: true })
  result: any;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.files)
  user: User;
}
