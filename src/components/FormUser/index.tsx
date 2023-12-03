import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  Email,
  ArrowBack,
  ErrorOutline,
  Save,
  LockOpen
} from "@styled-icons/material-outlined";

import Button from "components/Button";
import TextField from "components/TextField";
import { FormError, FormWrapper } from "components/Form";

import * as S from "./styles";
import Select from "../Select";

export type FormUserSchema = {
  username: string;
  email: string;
  password: string;
  role_id: number;
};

const initialValues: FormUserSchema = {
  username: "",
  email: "",
  role_id: 1,
  password:''
};

const formSchemaValues = Yup.object({
  email: Yup.string()
    .email("Insira um email válido")
    .required("Insira seu email"),
  username: Yup.string().required("Insira o nome do usuário"),
  role_id: Yup.number().required("Selecione o papel do usuário"),
  password: Yup.string().required("Insira a senha do usuário"),
});

export type FormUserProps = {
  handleSubmitForm: (values: FormUserSchema) => void;
  loading?: boolean;
  errorForm?: string;
  userForEdit?: FormUserSchema;
};

const FormUser = ({
  handleSubmitForm,
  loading = false,
  errorForm = "",
  userForEdit,
}: FormUserProps) => {
  const [formError, setFormError] = useState(errorForm);
  const routes = useRouter();

  const handleSubmit = async (values: FormUserSchema) => {
    handleSubmitForm(values);
  };

  useEffect(() => setFormError(errorForm), [errorForm]);

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <Formik
        validationSchema={formSchemaValues}
        initialValues={userForEdit || initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <S.WrapperActionsForm>
              <Button
                icon={<ArrowBack />}
                size="medium"
                onClick={() => routes.push("/users")}
                type="button"
              >
                Voltar
              </Button>
              <Button icon={<Save />} size="medium" type="submit">
                Salvar
              </Button>
            </S.WrapperActionsForm>
            <S.WrapperTextFields>
              <TextField
                name="username"
                label="Nome"
                placeholder="Nome do usuário"
                type="text"
                error={errors.username}
                icon={<Email />}
                onInput={(value) => setFieldValue("username", value)}
                value={values.username}
              />
              <TextField
                name="email"
                label="Email"
                placeholder="Email do usuário"
                type="text"
                error={errors.email}
                icon={<Email />}
                onInput={(value) => setFieldValue("email", value)}
                value={values.email}
              />
              <TextField
                name="password"
                label="Senha"
                placeholder="Senha do usuário"
                type="password"
                error={errors.password}
                icon={<LockOpen />}
                onInput={(value) => setFieldValue("password", value)}
                value={values.password}
              />
              <Select
                label="Selecione o tipo de usuário"
                onSelect={(value) => setFieldValue("role_id", value)}
                value={values.role_id}
                error={errors.role_id}
              >
                <option value={1}>Administrador</option>
                <option value={2}>Usuário</option>
              </Select>
            </S.WrapperTextFields>
            <S.WrapperTextFields></S.WrapperTextFields>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormUser;
