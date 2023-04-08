import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormError, FormWrapper } from 'components/Form';

type FormServiceSchema = {
  email: string;
  password: string;
};

const initialValues: FormServiceSchema = {
  email: '',
  password: ''
};

const formSchemaValues = Yup.object({});

export type FormServiceProps = {};

const FormService: FC<FormServiceProps> = () => {
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const routes = useRouter();

  const handleSubmit = async (values: FormServiceSchema) => {
    setLoading(true);

    setLoading(false);

    setFormError('Email ou senha inválido');
  };

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <Formik
        validationSchema={formSchemaValues}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <TextField
              name="email"
              placeholder="Email"
              type="email"
              error={errors.email}
              icon={<Email />}
              onChange={({ target }) => setFieldValue('email', target.value)}
              value={values.email}
            />
            <TextField
              name="password"
              placeholder="Senha"
              type="password"
              error={errors.password}
              icon={<Lock />}
              onChange={({ target }) => setFieldValue('password', target.value)}
              value={values.password}
            />

            <Button size="large" fullWidth>
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormService;
