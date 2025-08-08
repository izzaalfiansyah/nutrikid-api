import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./student.entity";
import { User } from "./user.entity";
import { MeasurementSuggestion } from "./measurement_suggestion.entity";

@Entity("measurements")
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.id, { eager: true })
  student: Student;

  @Column("double")
  student_height: number;

  @Column("double")
  student_weight: number;

  @Column("double")
  student_bmi: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator: User;

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
}
