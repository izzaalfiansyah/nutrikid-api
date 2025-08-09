import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "./school.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column("enum", {
    enum: ["admin", "teacher", "expert"],
    default: "teacher",
  })
  role: "admin" | "teacher" | "expert";

  @ManyToOne(() => School, (school) => school.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "school_id" })
  school?: School;

  @Column("timestamp", {
    default: () => "current_timestamp",
  })
  created_at?: Date;

  @Column("timestamp", {
    nullable: true,
  })
  deleted_at?: Date;
}
