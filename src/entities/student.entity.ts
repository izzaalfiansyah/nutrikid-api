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

  get age(): number {
    return moment().diff(this.birth_date, "years");
  }

  get age_month(): number {
    return this.age_month_total - this.age * 12;
  }

  get age_month_total(): number {
    return moment().diff(this.birth_date, "months");
  }

  toJson() {
    const age = this.age;
    const age_month_total = this.age_month_total;
    const age_month = this.age_month;

    return {
      ...this,
      age,
      age_month_total,
      age_month,
    };
  }
}
