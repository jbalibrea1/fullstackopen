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
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{ margin: 5 }}>
            <i>{part.description}</i>
          </p>
        </>
      )

    case 'groupProject':
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{ margin: 5 }}>
            project exercises {part.groupProjectCount}
          </p>
        </>
      )

    case 'submission':
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{ margin: 5 }}>
            <i>{part.description}</i>
          </p>
          <p style={{ margin: 5 }}>submit to {part.exerciseSubmissionLink}</p>
        </>
      )

    case 'special':
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p style={{ margin: 5 }}>
            <i>{part.description}</i>
          </p>
          <p style={{ margin: 5 }}>
            required skills: {part.requirements.join(', ')}
          </p>
        </>
      )

    default:
      return assertNever(part)
  }
}

export default ContentPart
