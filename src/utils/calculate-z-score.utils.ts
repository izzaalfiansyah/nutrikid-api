import { Gender } from "../entities/student.entity";

function makeZScoreFromMonth(month: number, zranges: number[]) {
  return {
    month: month,
    z_scores_range: zranges.map((z, i) => {
      return {
        z: [-3, -2, -1, 0, 1, 2, 3][i],
        min: z,
        max: zranges[i + 1] || z + 3,
      };
    }),
  };
}

export const male_z_scores = [
  makeZScoreFromMonth(48, [12.1, 13.1, 14.1, 15.3, 16.7, 18.2, 19.9]),
  makeZScoreFromMonth(49, [12.1, 13.0, 14.1, 15.3, 16.7, 18.2, 19.9]),
  makeZScoreFromMonth(50, [12.1, 13.0, 14.1, 15.3, 16.7, 18.2, 19.9]),
  makeZScoreFromMonth(51, [12.1, 13.0, 14.1, 15.3, 16.6, 18.2, 19.9]),
  makeZScoreFromMonth(52, [12.0, 13.0, 14.1, 15.3, 16.6, 18.2, 19.9]),
  makeZScoreFromMonth(53, [12.0, 13.0, 14.1, 15.3, 16.6, 18.2, 20.0]),
  makeZScoreFromMonth(54, [12.0, 13.0, 14.0, 15.3, 16.6, 18.2, 20.0]),
  makeZScoreFromMonth(55, [12.0, 13.0, 14.0, 15.2, 16.6, 18.2, 20.0]),
  makeZScoreFromMonth(56, [12.0, 12.9, 14.0, 15.2, 16.6, 18.2, 20.1]),
  makeZScoreFromMonth(57, [12.0, 12.9, 14.0, 15.2, 16.6, 18.2, 20.1]),
  makeZScoreFromMonth(58, [12.0, 12.9, 14.0, 15.2, 16.6, 18.3, 20.2]),
  makeZScoreFromMonth(59, [12.0, 12.9, 14.0, 15.2, 16.6, 18.3, 20.2]),
  makeZScoreFromMonth(60, [12.0, 12.9, 14.0, 15.2, 16.6, 18.3, 20.3]),
  makeZScoreFromMonth(61, [12.1, 13.0, 14.1, 15.3, 16.6, 18.3, 20.2]),
  makeZScoreFromMonth(62, [12.1, 13.0, 14.1, 15.3, 16.7, 18.3, 20.2]),
  makeZScoreFromMonth(64, [12.1, 13.0, 14.1, 15.3, 16.7, 18.3, 20.3]),
  makeZScoreFromMonth(65, [12.1, 13.0, 14.1, 15.3, 16.7, 18.3, 20.3]),
  makeZScoreFromMonth(66, [12.1, 13.0, 14.1, 15.3, 16.7, 18.4, 20.4]),
  makeZScoreFromMonth(67, [12.1, 13.0, 14.1, 15.3, 16.7, 18.4, 20.4]),
  makeZScoreFromMonth(68, [12.1, 13.0, 14.1, 15.3, 16.7, 18.4, 20.5]),
  makeZScoreFromMonth(69, [12.1, 13.0, 14.1, 15.3, 16.7, 18.4, 20.5]),
  makeZScoreFromMonth(70, [12.1, 13.0, 14.1, 15.3, 16.7, 18.5, 20.6]),
  makeZScoreFromMonth(71, [12.1, 13.0, 14.1, 15.3, 16.7, 18.5, 20.6]),
  makeZScoreFromMonth(72, [12.1, 13.0, 14.1, 15.3, 16.8, 18.5, 20.7]),
  makeZScoreFromMonth(73, [12.1, 13.0, 14.1, 15.3, 16.8, 18.6, 20.8]),
  makeZScoreFromMonth(74, [12.2, 13.1, 14.1, 15.3, 16.8, 18.6, 20.8]),
  makeZScoreFromMonth(75, [12.2, 13.1, 14.1, 15.3, 16.8, 18.6, 20.9]),
  makeZScoreFromMonth(76, [12.2, 13.1, 14.1, 15.4, 16.8, 18.7, 21.0]),
  makeZScoreFromMonth(77, [12.2, 13.1, 14.1, 15.4, 16.9, 18.7, 21.0]),
  makeZScoreFromMonth(78, [12.2, 13.1, 14.1, 15.4, 16.9, 18.7, 21.1]),
  makeZScoreFromMonth(79, [12.2, 13.1, 14.1, 15.4, 16.9, 18.8, 21.2]),
  makeZScoreFromMonth(80, [12.2, 13.1, 14.2, 15.4, 16.9, 18.8, 21.3]),
  makeZScoreFromMonth(81, [12.2, 13.1, 14.2, 15.4, 17.0, 18.9, 21.3]),
  makeZScoreFromMonth(82, [12.2, 13.1, 14.2, 15.4, 17.0, 18.9, 21.4]),
  makeZScoreFromMonth(83, [12.2, 13.1, 14.2, 15.5, 17.0, 19.0, 21.5]),
  makeZScoreFromMonth(84, [12.3, 13.1, 14.2, 15.5, 17.0, 19.0, 21.6]),
  makeZScoreFromMonth(85, [12.3, 13.2, 14.2, 15.5, 17.1, 19.1, 21.7]),
  makeZScoreFromMonth(86, [12.3, 13.2, 14.2, 15.5, 17.1, 19.1, 21.8]),
  makeZScoreFromMonth(87, [12.3, 13.2, 14.3, 15.5, 17.1, 19.2, 21.9]),
  makeZScoreFromMonth(88, [12.3, 13.2, 14.3, 15.6, 17.2, 19.2, 22.0]),
  makeZScoreFromMonth(89, [12.3, 13.2, 14.3, 15.6, 17.2, 19.3, 22.0]),
  makeZScoreFromMonth(90, [12.3, 13.2, 14.3, 15.6, 17.2, 19.3, 22.1]),
  makeZScoreFromMonth(91, [12.3, 13.2, 14.3, 15.6, 17.3, 19.4, 22.2]),
  makeZScoreFromMonth(92, [12.3, 13.2, 14.3, 15.6, 17.3, 19.4, 22.4]),
  makeZScoreFromMonth(93, [12.4, 13.3, 14.3, 15.7, 17.3, 19.5, 22.5]),
  makeZScoreFromMonth(94, [12.4, 13.3, 14.4, 15.7, 17.4, 19.6, 22.6]),
  makeZScoreFromMonth(95, [12.4, 13.3, 14.4, 15.7, 17.4, 19.6, 22.7]),
  makeZScoreFromMonth(96, [12.4, 13.3, 14.4, 15.7, 17.4, 19.7, 22.8]),
  makeZScoreFromMonth(97, [12.4, 13.3, 14.4, 15.8, 17.5, 19.7, 22.9]),
  makeZScoreFromMonth(98, [12.4, 13.3, 14.4, 15.8, 17.5, 19.8, 23.0]),
  makeZScoreFromMonth(99, [12.4, 13.3, 14.4, 15.8, 17.5, 19.9, 23.1]),
  makeZScoreFromMonth(100, [12.4, 13.4, 14.5, 15.8, 17.6, 19.9, 23.3]),
  makeZScoreFromMonth(101, [12.5, 13.4, 14.5, 15.9, 17.6, 20.0, 23.4]),
  makeZScoreFromMonth(102, [12.5, 13.4, 14.5, 15.9, 17.7, 20.1, 23.5]),
  makeZScoreFromMonth(103, [12.5, 13.4, 14.5, 15.9, 17.7, 20.1, 23.6]),
  makeZScoreFromMonth(104, [12.5, 13.4, 14.5, 15.9, 17.7, 20.2, 23.8]),
  makeZScoreFromMonth(105, [12.5, 13.4, 14.6, 16.0, 17.8, 20.3, 23.9]),
  makeZScoreFromMonth(106, [12.5, 13.5, 14.6, 16.0, 17.8, 20.3, 24.0]),
  makeZScoreFromMonth(107, [12.5, 13.5, 14.6, 16.0, 17.9, 20.4, 24.2]),
  makeZScoreFromMonth(108, [12.6, 13.5, 14.6, 16.0, 17.9, 20.5, 24.3]),
];

export const female_z_scores = [
  makeZScoreFromMonth(48, [11.8, 12.8, 14.0, 15.3, 16.8, 18.5, 20.6]),
  makeZScoreFromMonth(49, [11.8, 12.8, 13.9, 15.3, 16.8, 18.5, 20.6]),
  makeZScoreFromMonth(50, [11.8, 12.8, 13.9, 15.3, 16.8, 18.6, 20.7]),
  makeZScoreFromMonth(51, [11.8, 12.8, 13.9, 15.3, 16.8, 18.6, 20.7]),
  makeZScoreFromMonth(52, [11.7, 12.8, 13.9, 15.2, 16.8, 18.6, 20.7]),
  makeZScoreFromMonth(53, [11.7, 12.7, 13.9, 15.3, 16.8, 18.6, 20.8]),
  makeZScoreFromMonth(54, [11.7, 12.7, 13.9, 15.3, 16.8, 18.7, 20.8]),
  makeZScoreFromMonth(55, [11.7, 12.7, 13.9, 15.3, 16.8, 18.7, 20.9]),
  makeZScoreFromMonth(56, [11.7, 12.7, 13.9, 15.3, 16.8, 18.7, 20.9]),
  makeZScoreFromMonth(57, [11.7, 12.7, 13.9, 15.3, 16.9, 18.7, 21.0]),
  makeZScoreFromMonth(58, [11.7, 12.7, 13.9, 15.3, 16.9, 18.8, 21.0]),
  makeZScoreFromMonth(59, [11.6, 12.7, 13.9, 15.3, 16.9, 18.8, 21.0]),
  makeZScoreFromMonth(60, [11.6, 12.7, 13.9, 15.3, 16.9, 18.8, 21.1]),
  makeZScoreFromMonth(61, [11.8, 12.7, 13.9, 15.2, 16.9, 18.9, 21.3]),
  makeZScoreFromMonth(62, [11.8, 12.7, 13.9, 15.2, 16.9, 18.9, 21.4]),
  makeZScoreFromMonth(63, [11.8, 12.7, 13.9, 15.2, 16.9, 18.9, 21.5]),
  makeZScoreFromMonth(64, [11.8, 12.7, 13.9, 15.2, 16.9, 18.9, 21.5]),
  makeZScoreFromMonth(65, [11.7, 12.7, 13.9, 15.2, 16.9, 19.0, 21.6]),
  makeZScoreFromMonth(67, [11.7, 12.7, 13.9, 15.2, 16.9, 19.0, 21.7]),
  makeZScoreFromMonth(68, [11.7, 12.7, 13.9, 15.2, 16.9, 19.0, 21.7]),
  makeZScoreFromMonth(69, [11.7, 12.7, 13.9, 15.3, 17.0, 19.1, 21.8]),
  makeZScoreFromMonth(70, [11.7, 12.7, 13.9, 15.3, 17.0, 19.1, 21.9]),
  makeZScoreFromMonth(71, [11.7, 12.7, 13.9, 15.3, 17.0, 19.1, 22.0]),
  makeZScoreFromMonth(72, [11.7, 12.7, 13.9, 15.3, 17.0, 19.2, 22.1]),
  makeZScoreFromMonth(73, [11.7, 12.7, 13.9, 15.3, 17.0, 19.2, 22.1]),
  makeZScoreFromMonth(74, [11.7, 12.7, 13.9, 15.3, 17.0, 19.3, 22.2]),
  makeZScoreFromMonth(75, [11.7, 12.7, 13.9, 15.3, 17.0, 19.3, 22.3]),
  makeZScoreFromMonth(76, [11.7, 12.7, 13.9, 15.3, 17.1, 19.3, 22.4]),
  makeZScoreFromMonth(77, [11.7, 12.7, 13.9, 15.3, 17.1, 19.4, 22.5]),
  makeZScoreFromMonth(78, [11.7, 12.7, 13.9, 15.3, 17.1, 19.4, 22.6]),
  makeZScoreFromMonth(79, [11.7, 12.7, 13.9, 15.3, 17.1, 19.5, 22.7]),
  makeZScoreFromMonth(80, [11.7, 12.7, 13.9, 15.3, 17.2, 19.5, 22.8]),
  makeZScoreFromMonth(81, [11.7, 12.7, 13.9, 15.3, 17.2, 19.6, 22.9]),
  makeZScoreFromMonth(82, [11.7, 12.7, 13.9, 15.4, 17.2, 19.6, 23.0]),
  makeZScoreFromMonth(83, [11.7, 12.7, 13.9, 15.4, 17.2, 19.7, 23.1]),
  makeZScoreFromMonth(84, [11.7, 12.7, 13.9, 15.4, 17.3, 19.7, 23.2]),
  makeZScoreFromMonth(85, [11.8, 12.7, 13.9, 15.4, 17.3, 19.8, 23.3]),
  makeZScoreFromMonth(86, [11.8, 12.7, 13.9, 15.4, 17.3, 19.8, 23.4]),
  makeZScoreFromMonth(87, [11.8, 12.8, 14.0, 15.4, 17.4, 19.9, 23.5]),
  makeZScoreFromMonth(88, [11.8, 12.8, 14.0, 15.5, 17.4, 20.0, 23.6]),
  makeZScoreFromMonth(89, [11.8, 12.8, 14.0, 15.5, 17.4, 20.0, 23.7]),
  makeZScoreFromMonth(90, [11.8, 12.8, 14.0, 15.5, 17.5, 20.1, 23.9]),
  makeZScoreFromMonth(91, [11.8, 12.8, 14.0, 15.5, 17.5, 20.1, 24.0]),
  makeZScoreFromMonth(92, [11.8, 12.8, 14.0, 15.5, 17.5, 20.2, 24.1]),
  makeZScoreFromMonth(93, [11.8, 12.8, 14.0, 15.6, 17.6, 20.3, 24.2]),
  makeZScoreFromMonth(94, [11.8, 12.8, 14.1, 15.6, 17.6, 20.3, 24.4]),
  makeZScoreFromMonth(95, [11.9, 12.9, 14.1, 15.6, 17.6, 20.4, 24.5]),
  makeZScoreFromMonth(96, [11.9, 12.9, 14.1, 15.7, 17.7, 20.5, 24.6]),
  makeZScoreFromMonth(97, [11.9, 12.9, 14.1, 15.7, 17.7, 20.6, 24.8]),
  makeZScoreFromMonth(98, [11.9, 12.9, 14.1, 15.7, 17.8, 20.6, 24.9]),
  makeZScoreFromMonth(99, [11.9, 12.9, 14.2, 15.7, 17.8, 20.7, 25.1]),
  makeZScoreFromMonth(100, [11.9, 12.9, 14.2, 15.8, 17.9, 20.8, 25.2]),
  makeZScoreFromMonth(101, [11.9, 13.0, 14.2, 15.8, 17.9, 20.9, 25.3]),
  makeZScoreFromMonth(102, [12.0, 13.0, 14.2, 15.8, 18.0, 20.9, 25.5]),
  makeZScoreFromMonth(103, [12.0, 13.0, 14.3, 15.9, 18.0, 21.0, 25.6]),
  makeZScoreFromMonth(104, [12.0, 13.0, 14.3, 15.9, 18.1, 21.1, 25.8]),
  makeZScoreFromMonth(105, [12.0, 13.0, 14.3, 15.9, 18.1, 21.2, 25.9]),
  makeZScoreFromMonth(106, [12.0, 13.1, 14.3, 16.0, 18.2, 21.3, 26.1]),
  makeZScoreFromMonth(107, [12.1, 13.1, 14.4, 16.0, 18.2, 21.3, 26.2]),
  makeZScoreFromMonth(108, [12.1, 13.1, 14.4, 16.1, 18.3, 21.4, 26.4]),
];

export function calculateZScore(bmi: number, month: number, gender: Gender) {
  let selectedZScore = gender == "l" ? male_z_scores[0] : female_z_scores[0];

  if (month > 108) {
    const lastIndex = male_z_scores.length - 1;
    selectedZScore =
      gender == "l" ? male_z_scores[lastIndex] : female_z_scores[lastIndex];
  } else if (month >= 48) {
    try {
      selectedZScore = (gender == "l" ? male_z_scores : female_z_scores).find(
        (z) => z.month == month,
      )!;
    } catch (err) {
      // do nothing
    }
  }

  let z_score = 0;

  try {
    const ranges = selectedZScore!.z_scores_range;
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i]!;
      if (i == 0 && bmi < range.min) {
        z_score = range.z!;
        break;
      }

      if (i == ranges.length - 1 && bmi > range.max) {
        z_score = range.z!;
        break;
      }

      if (bmi >= range.min && bmi <= range.max) {
        z_score = range.z!;
        break;
      }
    }
  } catch (err) {
    // do nothing
  }

  return z_score;
}
