import { HospitalEntry } from '../types';
import { useStateValue } from '../state';

const HospitalEntryContainer = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnosis }] = useStateValue();

  const getDiagnosisCodeInfo =  (code: string) => {
    return diagnosis[code]?.name;
  };


  return (
    <>
      <div key={entry.id}>
        <p>
          {entry.date} {entry.description}
        </p>
        <ul>
          {entry.diagnosisCodes &&
            entry.diagnosisCodes.map((diagnoses) => (
              <li key={diagnoses}>
                {diagnoses} {getDiagnosisCodeInfo(diagnoses)}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default HospitalEntryContainer;
