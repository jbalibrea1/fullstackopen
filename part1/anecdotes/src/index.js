import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ type, name }) => {
  const Type = type
  return <Type>{name}</Type>
}

const Anecdote = ({ anecdote }) => <p>{anecdote}</p>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const MostVotes = ({ votes }) => {
  const IndexMaxValue = votes.indexOf(Math.max(...votes))
  const Index = anecdotes[IndexMaxValue]
  const VotesFilter = votes.every(item => item === 0)

  if (VotesFilter === true) {
    return false
  }
  return <p>{Index}</p>
}

const App = props => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomNumber = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVoteNumber = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header type='h1' name='Anecdote of the day' />
      <Anecdote anecdote={props.anecdotes[selected]} />
      <Button onClick={handleVoteNumber} text='vote' />
      <Button onClick={handleRandomNumber} text='next anecdote' />
      <Header type='h2' name='Anecdote with most votes' />
      <MostVotes votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
