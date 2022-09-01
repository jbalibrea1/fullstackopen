import diagnoses from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const getEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

export default {
  getEntries,
};