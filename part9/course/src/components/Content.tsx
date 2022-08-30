import ContentPart from './ContentPart'
import { CoursePart } from '../types'

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {Object.values(parts).map((part) => (
        <ContentPart key={part.name} part={part} />
      ))}
    </>
  )
}

export default Content

