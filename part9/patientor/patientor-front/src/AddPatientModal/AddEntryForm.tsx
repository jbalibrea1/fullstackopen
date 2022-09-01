import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import { TextField, SelectField, TypeOption } from './FormField';
import { DiagnosisSelection } from './FormField';
import { EntryForm, Types, HealthCheckRating } from '../types';

export type EntryFormValues = EntryForm;
interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
  patientId: string
}

const entryTypeOptions: TypeOption[] = [
  { value: Types.HealthCheck, label: 'HealthCheck' },
  { value: Types.OccupationalHealthcare, label: 'OccupationalHealthcare' },
  { value: Types.Hospital, label: 'Hospital' },
];

const ratingOptions: TypeOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

/**
 *
 * Check Conditionals and expands if is required
 */

const CheckConditionals = ({ type }: { type: string }) => {
  if (type === 'Hospital') return <HospitalConditional />;
  if (type === 'OccupationalHealthcare')
    return <OccupationalHealthcareConditional />;
  if (type === 'HealthCheck') return <HealthCheckConditional />;
  return null;
};

const HospitalConditional = () => {
  return (
    <>
      <Field
        label="Discharge Date"
        placeholder="YYYY-MM-DD"
        name="dischargeDate"
        component={TextField}
      />
      <Field label="Criteria" name="dischargeCriteria" component={TextField} />
    </>
  );
};

const OccupationalHealthcareConditional = () => {
  return (
    <>
      <Field label="EmployerName" name="employerName" component={TextField} />
      <Field
        label="Sick Leave Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeaveStartDate"
        component={TextField}
      />
      <Field
        label="Sick Leave End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeaveEndDate"
        component={TextField}
      />
    </>
  );
};

const HealthCheckConditional = () => {
  return (
    <SelectField
      label="Rating"
      name="healthCheckRating"
      options={ratingOptions}
    />
  );
};

export const AddEntryForm = ({ onSubmit, onCancel, patientId }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        id: patientId,
        description: '',
        date: '',
        specialist: '',
        type: Types.Hospital,
        diagnosisCodes: [],
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveEndDate: '',
        sickLeaveStartDate: '',
        healthCheckRating: HealthCheckRating.LowRisk,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
        }
        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeaveStartDate && !values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          }
          if (values.sickLeaveEndDate && !values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          }
        }
        if (values.type === 'HealthCheck') {
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField
              label="TypeOptions"
              name="type"
              options={entryTypeOptions}
            />
            <CheckConditionals type={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
