import patientsDB from '../../data/patients';
import {
  PublicPatient,
  NewPatient,
  Patient,
  Entry,
  EntryWithoutId,
} from '../types';
import { v4 as uuidv4  } from 'uuid';

const patients: Patient[] = patientsDB;


const getEntries = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient: Patient = {
    id: uuidv4(),
    ...entry,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (identity: string, entry: EntryWithoutId): Entry => {
  const patient = getPatient(identity);
  const entries = patient?.entries;

  if (!patient) throw new Error(`Error`);

  const newEntryWithId: Entry = {
    id: uuidv4(),
    ...entry,
  };
  entries?.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addNewEntry,
};
