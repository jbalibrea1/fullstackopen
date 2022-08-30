import { CoursePart } from '../types'

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const ContentPart = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div style={{marginBottom: 20}}>
          <b>
            {part.name} {part.exerciseCount} 
          </b>
          <p style={{margin: 5}}>{part.description}</p>
        </div>
      )

    case 'groupProject':
      return (
        <div style={{marginBottom: 20}}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{margin: 5}}>project exercises {part.groupProjectCount}</p>
        </div>
      )

    case 'submission':
      return (
        <div style={{marginBottom: 20}}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{margin: 5}}>{part.description}</p>
          <p style={{margin: 5}}>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )

    case 'special':
      return (
        <div style={{marginBottom: 20}}>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{margin: 5}}>{part.description}</p>
          <p style={{margin: 5}}>required skills: {part.requirements.join(', ')}</p>
        </div>
      )

    default:
      return assertNever(part)
  }
}

export default ContentPart
