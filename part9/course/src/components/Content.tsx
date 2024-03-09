import { CoursePart } from '../types';
import ContentPart from './ContentPart';

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part) => (
        <div key={part.name} style={{ marginBottom: 20 }}>
          <ContentPart part={part} />
        </div>
      ))}
    </>
  );
};

export default Content;
