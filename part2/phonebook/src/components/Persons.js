import Note from './Note'

const Persons = ({ persons }) => (
  <div>
    {persons.map(persons => (
      <Note key={persons.id} {...persons} />
    ))}
  </div>
)

export default Persons
