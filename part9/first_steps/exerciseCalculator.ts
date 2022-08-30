type rating = 1 | 2 | 3;

interface ExerciseValues {
  target: number;
  dailyExerciseHours: Array<number>;
}

export const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      dailyExerciseHours: args.map((ar) => Number(ar)).slice(3),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface AverageValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  target: number,
  dailyExerciseHours: Array<number>,
): AverageValues => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

  // const success = average >= target ? true : false

  let rating: rating = 1;
  if (average >= target - 0.5) rating = 2;
  if (average >= target) rating = 3;
  const ratingDescription: { [position: number]: string } = {
    1: 'bad',
    2: 'not too bad but could be better',
    3: 'very good',
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: rating === 3,
    rating,
    ratingDescription: ratingDescription[rating],
    target: target,
    average: average,
  };
};

try {
  const { dailyExerciseHours, target } = parseExerciseArguments(process.argv);
  exerciseCalculator(target, dailyExerciseHours);
  console.log(exerciseCalculator(target, dailyExerciseHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
