const Total = ({ coursePartsTotal }: { coursePartsTotal: object }) => {
  const totalOfExercises = Object.values(coursePartsTotal).reduce(
    (value, part) => value + part.exerciseCount,
    0
  )
  return <p>Number of exercises {totalOfExercises}</p>
}
export default Total
