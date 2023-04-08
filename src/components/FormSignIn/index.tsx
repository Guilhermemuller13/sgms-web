import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Email, Lock, ErrorOutline } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormError, FormLink, FormWrapper } from 'components/Form';
import { authService } from '../../services/auth/authService';

type FormSignInSchema = {
  email: string;
  password: string;
};

const initialValues: FormSignInSchema = {
  email: '',
  password: ''
};

const formSchemaValues = Yup.object({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Insira seu email'),
  password: Yup.string().required('Insira sua senha')
});

export type FormSignInProps = {};

const FormSignIn: FC<FormSignInProps> = () => {
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const { push, query } = useRouter();

  const handleSubmit = async (values: FormSignInSchema) => {
    setLoading(true);
    authService
      .login({
        email: values.email,
        password: values.password
      })
      .then(() => {
        setLoading(false);
        push(`${window.location.origin}${query?.callbackUrl || ''}`);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        setFormError('Email ou senha inválido');
      });
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
              Entrar
            </Button>

            <FormLink>
              Não possui uma conta?
              <Link href="/sign-up">
                <a>Cadastrar</a>
              </Link>
            </FormLink>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormSignIn;
