import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ type, name }) => {
  const Type = type
  return <Type>{name}</Type>
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ prop }) => {
  const clicksTotal = prop.good + prop.neutral + prop.bad
  const clicksAverage =
    (prop.good * 1 + prop.neutral * 0 + prop.bad * -1) / clicksTotal
  const clicksPositive = (prop.good / clicksTotal) * 100 + ' %'

  if (clicksTotal === 0) {
    return <p>No feedback given</p>
  } else
    return (
      <table>
        <tbody>
          <Statistic text='good' value={prop.good} />
          <Statistic text='neutral' value={prop.neutral} />
          <Statistic text='bad' value={prop.bad} />
          <Statistic text='all' value={clicksTotal} />
          <Statistic text='average' value={clicksAverage} />
          <Statistic text='positive' value={clicksPositive} />
        </tbody>
      </table>
    )
}
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const handleGoodClick = () => setClicks({ ...clicks, good: clicks.good + 1 })

  const handleNeutralClick = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })

  const handleBadClick = () => setClicks({ ...clicks, bad: clicks.bad + 1 })

  return (
    <div>
      <Header type='h1' name='Give feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neural' />
      <Button onClick={handleBadClick} text='bad' />
      <Header type='h2' name='Statistics' />
      <Statistics prop={clicks} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
