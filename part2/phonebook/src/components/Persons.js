import Note from './Note'

const Persons = ({ persons, delUser }) => (
  <div>
    {persons.map(persons => (
      <Note key={persons.id} {...persons} delUser={delUser} />
    ))}
  </div>
)

export default Persons
