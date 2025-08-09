import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "./school.entity";
import { Measurement } from "./measurement.entity";
import moment from "moment";

export type Gender = "l" | "p";

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
  gender: Gender;

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
  age: number;
  age_month: number;
  age_month_total: number;

  toJson() {
    const age = moment().diff(this.birth_date, "years");
    const age_month_total = moment().diff(this.birth_date, "months");
    const age_month = age_month_total - age * 12;

    return {
      ...this,
      age,
      age_month_total,
      age_month,
    };
  }
}
