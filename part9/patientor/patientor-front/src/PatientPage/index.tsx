import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Button from '@mui/material/Button';
import { AddEntryModal } from '../AddPatientModal';

import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  setFullPatient,
  setDiagnosisList,
  addNewEntry,
} from '../state';
import { Patient, Entry, Diagnosis } from '../types';
import { EntryFormValues } from '../AddPatientModal/AddEntryForm';

import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import HospitalEntryContainer from './HospitalEntryContainer';

const PatientPage = () => {
  const [{ patientPrivateDetails }, dispatch] = useStateValue();

  const [patient, setPatient] = useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id = '' } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  useEffect(() => {
    const fetchFullPatient = async () => {
      try {
        const { data: privatePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(privatePatient);
        dispatch(setFullPatient(privatePatient));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnostic = async () => {
      try {
        const { data: diagnosisList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisList));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnostic();
    void fetchFullPatient();
  }, [dispatch]);

  if (!patient || !patient.ssn || !patientPrivateDetails) return <div>Loading...</div>;

  const getGenderIcon = (gender: string) => {
    if (gender === 'male') return <MaleIcon fontSize="large" />;
    if (gender === 'female') return <FemaleIcon fontSize="large" />;
    return '';
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryContainer entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const PatientEntries = () => {
    return (
      <>
        <h2>entries</h2>
        {patient.entries?.map((entry: Entry) => (
          <div
            key={entry.id}
            style={{
              border: '2px solid black',
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <EntryDetails entry={entry} />
          </div>
        ))}
      </>
    );
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addNewEntry(values.id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="patient">
      <div>
        <h1>
          {patient.name} {getGenderIcon(patient.gender)}
        </h1>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <PatientEntries />
      <AddEntryModal
        onSubmit={submitNewEntry}
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        patientId={patient.id}
      />
      <Button variant="contained" onClick={() => openModal()}>
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientPage;
