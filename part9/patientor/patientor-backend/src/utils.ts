import {
  Gender,
  NewPatient,
  EntryWithoutId,
  HealthCheckRating,
  NewEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

function isArrayOfStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string ' + string);
  }
  return string;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date ' + date);
  }
  return date;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseDiagnosis = (diagnosisCodes: unknown): Array<string> => {
  if (!diagnosisCodes || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis: ' + diagnosisCodes);
  }

  return diagnosisCodes;
};

const parseHealthCheck = (healthCheck: unknown): HealthCheckRating => {
  // if (healthCheck === 0) return healthCheck;
  if (!healthCheck && healthCheck !== 0|| !isHealthCheckRating(healthCheck)) {
    throw new Error('Incorrect or missing healthCheck: ' + healthCheck);
  }
  return healthCheck;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

type FieldsNewPatient = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: FieldsNewPatient): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId => {
  const baseEntry: NewEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheck(object.healthCheckRating),
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.dischargeDate),
          criteria: parseString(object.dischargeCriteria),
        },
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: parseDate(object.sickLeaveStartDate),
          endDate: parseDate(object.sickLeaveEndDate),
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName),
        sickLeave,
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
};

export default toNewPatient;
