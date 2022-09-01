import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'FULL_PATIENT'
      payload: Patient
    }
  | {
      type: 'SET_DIAGNOSIS_LIST'
      payload: Diagnosis[]
    }
  | {
      type: 'ADD_ENTRY'
      payload: Entry
      patientId: string
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'FULL_PATIENT':
      return {
        ...state,
        patientPrivateDetails: {
          ...state.patientPrivateDetails,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case 'ADD_ENTRY':
      const newEntry = state.patientPrivateDetails[action.patientId];
      newEntry.entries?.push(action.payload);
      return {
        ...state,
        patientPrivateDetails: {
          ...state.patientPrivateDetails,
          [action.patientId]: newEntry,
        },
      };

    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientListFromApi };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: newPatient };
};

export const setFullPatient = (privatePatient: Patient): Action => {
  return { type: 'FULL_PATIENT', payload: privatePatient };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisList };
};

export const addNewEntry = (patientId: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    patientId,
  };
};
