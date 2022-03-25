// export const Total = ({ content }) => {
//   const rest = content.map(res => res.exercises)
//   const total = rest.reduce((s, p) => s + p)
//   return <p>{total}</p>
// }

export const Total = ({ content }) => {
  const total = content.reduce((s, p) => s + p.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}
