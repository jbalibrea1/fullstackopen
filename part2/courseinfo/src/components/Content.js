import { Part } from './Part'

export const Content = ({ content }) => (
  <div>
    {content.map(part => (
      <Part key={part.id} name={part.name} exercise={part.exercises} />
    ))}
  </div>
)
