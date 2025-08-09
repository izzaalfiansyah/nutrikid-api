import moment from "moment";
import { Gender, Student } from "../entities/student.entity";
import { calculateZScore } from "./calculate-z-score.utils";
import { calculateStatus } from "./calculate-status.utils";

export interface CalculateResultProps {
  height: number;
  weight: number;
  gender: Gender;
  birth_date: Date;
}

export function calculateResult({
  height,
  weight,
  birth_date,
  gender,
}: CalculateResultProps) {
  try {
    const bmi = weight / Math.pow(height / 100, 2);
    const student = new Student();
    student.birth_date = moment(birth_date).toDate();

    const age = student.age;
    const age_month = student.age_month;
    const age_month_total = student.age_month_total;

    const z_score = calculateZScore(bmi, age_month_total, gender);
    const status = calculateStatus(z_score);

    return {
      height,
      weight,
      bmi,
      age,
      age_month,
      age_month_total,
      z_score,
      status,
    };
  } catch (err) {
    throw err;
  }
}
