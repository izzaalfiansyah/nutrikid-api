import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { User } from "./user.entity";
import { MeasurementSuggestion } from "./measurement_suggestion.entity";
import {
  calculateStatus,
  MeasurementStatus,
} from "../utils/calculate-status.utils";
import { calculateResult } from "../utils/calculate-result.utils";
import { calculateZScore } from "../utils/calculate-z-score.utils";

@Entity("measurements")
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.id, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column("double")
  student_height: number;

  @Column("double")
  student_weight: number;

  @Column("double")
  student_age: number;

  @Column("double")
  student_age_month: number;

  @Column("double")
  student_bmi: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: "NO ACTION",
  })
  @JoinColumn({ name: "creator_id" })
  creator?: User;

  @OneToMany(
    () => MeasurementSuggestion,
    (suggestion) => suggestion.measurement,
    { eager: true },
  )
  suggestions: [];

  @Column("timestamp", { default: () => "current_timestamp" })
  created_at: Date;

  @Column("timestamp", { nullable: true })
  deleted_at?: Date;

  z_score: number;
  status: MeasurementStatus;

  toJson() {
    const z_score = calculateZScore(
      this.student_bmi,
      this.student_age * 12 + this.student_age_month,
      this.student.gender,
    );
    const status = calculateStatus(z_score);

    return {
      ...this,
      z_score,
      status,
    };
  }
}
