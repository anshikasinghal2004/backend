'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Container } from '@material-ui/core';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  representative_name: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  email_id: Yup.string().required('Required'),
  mobile_number: Yup.string().required('Required'),
  process_list: Yup.string().required('Required'),
});

const ClientForm = ({ initialValues, onSubmit }) => {
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Name"
                  helperText={<ErrorMessage name="name" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="representative_name"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Representative Name"
                  helperText={<ErrorMessage name="representative_name" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="designation"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Designation"
                  helperText={<ErrorMessage name="designation" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="department"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Department"
                  helperText={<ErrorMessage name="department" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email_id"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Email ID"
                  helperText={<ErrorMessage name="email_id" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="mobile_number"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Mobile Number"
                  helperText={<ErrorMessage name="mobile_number" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="process_list"
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  label="Process List"
                  helperText={<ErrorMessage name="process_list" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ClientForm;
