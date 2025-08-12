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
import { calculateZScore } from "../utils/calculate-z-score.utils";
import { getSuggestionAdvices } from "../utils/get-suggestion-advices.utils";

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

  get student_age_month_total(): number {
    return this.student_age * 12 + this.student_age_month;
  }

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

  get z_score(): number {
    return calculateZScore(
      this.student_bmi,
      this.student_age * 12 + this.student_age_month,
      this.student.gender,
    );
  }

  get status(): MeasurementStatus {
    return calculateStatus(this.z_score);
  }

  get suggestion_advices(): Array<string> {
    return getSuggestionAdvices(this.z_score);
  }

  toJson() {
    const z_score = this.z_score;
    const status = this.status;
    const suggestion_advices = this.suggestion_advices;
    const student_age_month_total = this.student_age_month_total;

    return {
      ...this,
      z_score,
      status,
      suggestion_advices,
      student_age_month_total,
    };
  }
}
