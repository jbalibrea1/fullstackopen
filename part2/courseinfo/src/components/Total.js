const Total = ({ exer }) => {
  const total = exer.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}

export default Total
