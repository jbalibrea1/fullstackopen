import { CoursePart } from '../types';

const Total = ({ coursePartsTotal }: { coursePartsTotal: CoursePart[] }) => {
  const totalOfExercises = coursePartsTotal.reduce(
    (sum, val) => sum + val.exerciseCount,
    0
  );
  return <p>Number of exercises: {totalOfExercises}</p>;
};
export default Total;
