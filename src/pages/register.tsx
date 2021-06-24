import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { Wrapper } from '../components/Wrapper';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div>Register attempt</div>
            <FormControl // isInvalid={form.errors.name && form.touched.name}
            >
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                value={values.username}
                id="username"
                placeholder="username"
                onChange={handleChange}
              />
              {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Register;
