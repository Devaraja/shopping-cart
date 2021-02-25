import React from 'react';
 import ReactDOM from 'react-dom';
 import { Formik, Form, useField } from 'formik';
 import * as Yup from 'yup';
 import Container from '@material-ui/core/Container';
 import Grid from '@material-ui/core/Grid';
 import Button from '@material-ui/core/Button';
 import '../styles.css'

export default function UserForm() {

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input>. We can use field meta to show an error
        // message if the field is invalid and it has been touched (i.e. visited)
        const [field, meta] = useField(props);
        return (
          <p>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
              <div className="errors">{meta.error}</div>
            ) : null}
          </p>
        );
      };

      const MyCheckbox = ({ children, ...props }) => {
        // React treats radios and checkbox inputs differently other input types, select, and textarea.
        // Formik does this too! When you specify `type` to useField(), it will
        // return the correct bag of props for you -- a `checked` prop will be included
        // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
        const [field, meta] = useField({ ...props, type: 'checkbox' });
        return (
          <div>
            <label className="checkbox-input">
              <input type="checkbox" {...field} {...props} />
              {children}
            </label>
            {meta.touched && meta.error ? (
              <div className="errors">{meta.error}</div>
            ) : null}
          </div>
        );
      };
      const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
              <span className="errors">{meta.error}</span>
            ) : null}
          </div>
        );
      };

      const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return (
            <Container>
              <p></p>
              <Grid container justify = "center">
              
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  mobile: '',
                  acceptedTerms: false, // added for our checkbox
                  jobType: '', // added for our select
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                  lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                    mobile: Yup.string()
                    .min(10, 'Must be 10 digits')
                    .max(10, 'Must be 10 digits')
                    .matches(phoneRegExp, 'Phone number is not valid')
                    .required('Required'),
                  acceptedTerms: Yup.boolean()
                    .required('Required')
                    .oneOf([true], <div>You must accept the terms and conditions.</div>),
                  jobType: Yup.string()
                    .oneOf(
                      ['home', 'office', 'other'],
                      'Invalid delivery Type'
                    )
                    .required(<div>Required</div>),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form>
                  <MyTextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                  />
        
                  <MyTextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                  />
        
                  <MyTextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="email id"
                  />

<MyTextInput
                    label="Mobile Number"
                    name="mobile"
                    type="mobile"
                    placeholder="mobile number"
                  />
        
                  <MySelect label="Job Type" name="jobType">
                    <option value="">Select delivery type</option>
                    <option value="home">Home address</option>
                    <option value="office">Office address</option>
                    <option value="other">Other</option>
                  </MySelect>
        
                  <MyCheckbox name="acceptedTerms">
                    I accept the terms and conditions
                  </MyCheckbox>
                  <Button variant="contained" color="primary" type="submit">Place order</Button>
                </Form>
              </Formik>
              </Grid>
            </Container>
    )

}