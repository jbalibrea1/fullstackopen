import ContentPart from './ContentPart'
import { CoursePart } from '../types'

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {Object.values(parts).map((part) => (
        <div key={part.name} style={{ marginBottom: 20 }}>
          <ContentPart part={part} />
        </div>
      ))}
    </>
  )
}

export default Content
