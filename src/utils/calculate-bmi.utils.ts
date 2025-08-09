interface CalculateBmiProps {
  height: number;
  weight: number;
}

export function calculateBmi({ height, weight }: CalculateBmiProps) {
  try {
    const bmi = weight / Math.pow(height / 100, 2);

    return {
      height,
      weight,
      bmi,
    };
  } catch (err) {
    throw err;
  }
}
