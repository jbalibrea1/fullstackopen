const Total = ({ coursePartsTotal }: { coursePartsTotal: object }) => {
  return (
    <p>
      Number of exercises{' '}
      {Object.values(coursePartsTotal).reduce(
        (carry, part) => carry + part.exerciseCount,
        0
      )}
    </p>
  )
}
export default Total
