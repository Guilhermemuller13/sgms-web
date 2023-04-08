import { FC } from 'react';
import Link from 'next/link';
import { Email, Lock, AccountCircle } from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormWrapper, FormLink } from 'components/Form';

export type FormSignUpProps = {};

const FormSignUp: FC<FormSignUpProps> = () => {
  return (
    <FormWrapper>
      <form>
        <TextField
          name="name"
          placeholder="Nome"
          type="name"
          icon={<AccountCircle />}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Senha"
          type="password"
          icon={<Lock />}
        />
        <TextField
          name="confirm-password"
          placeholder="Confirmação de senha"
          type="password"
          icon={<Lock />}
        />

        <Button size="large" fullWidth>
          Entrar
        </Button>

        <FormLink>
          Já possuí uma conta?
          <Link href="/sign-in">
            <a>Login</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignUp;
