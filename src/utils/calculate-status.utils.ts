export type MeasurementStatus =
  | "emaciated"
  | "thinnes"
  | "normal"
  | "overweight"
  | "obese";

export function calculateStatus(z_score: number): MeasurementStatus {
  if (z_score <= -3) {
    return "emaciated";
  } else if (z_score <= -2) {
    return "thinnes";
  } else if (z_score <= 1) {
    return "normal";
  } else if (z_score <= 2) {
    return "overweight";
  } else {
    return "obese";
  }
}
