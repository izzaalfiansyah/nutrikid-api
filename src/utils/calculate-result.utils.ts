import moment from "moment";
import { Gender } from "../entities/student.entity";
import { calculateZScore } from "./calculate-z-score.utils";
import { calculateStatus } from "./calculate-status.utils";

export interface CalculateResultProps {
  height: number;
  weight: number;
  gender: Gender;
  birth_date: Date;
  created_at?: Date;
}

export function calculateResult({
  height,
  weight,
  birth_date,
  gender,
  created_at,
}: CalculateResultProps) {
  try {
    const bmi = weight / Math.pow(height / 100, 2);

    const age = moment(created_at).diff(birth_date, "years");
    const age_month_total = moment(created_at).diff(birth_date, "months");
    const age_month = age_month_total - age * 12;

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
