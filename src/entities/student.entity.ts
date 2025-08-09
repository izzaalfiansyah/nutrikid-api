import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "./school.entity";
import { Measurement } from "./measurement.entity";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nisn: string;

  @Column()
  name: string;

  @Column("date")
  birth_date: Date;

  @Column("enum", {
    enum: ["l", "p"],
  })
  gender: "l" | "p";

  @ManyToOne(() => School, (school) => school.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "school_id" })
  school: School;

  @Column("timestamp", {
    nullable: true,
  })
  deleted_at?: Date;

  measurement?: Measurement;
}
