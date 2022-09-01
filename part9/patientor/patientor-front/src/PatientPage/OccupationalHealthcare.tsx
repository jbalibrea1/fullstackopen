import { OccupationalHealthcareEntry } from '../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry
}) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date} <WorkIcon/> {entry.employerName}
      </p>
      <p>{entry.description} </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
