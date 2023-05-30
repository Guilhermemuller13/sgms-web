import { FC, useState } from "react";
import { useRouter } from "next/router";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  Email,
  ErrorOutline,
  ArrowBack,
  Save,
} from "@styled-icons/material-outlined";

import Button from "components/Button";
import TextField from "components/TextField";
import { FormError, FormWrapper } from "components/Form";
import TextAreaField from "../TextAreaField";

import * as S from "./styles";

type FormServiceSchema = {
  email: string;
  password: string;
  productsId: number[];
  motorcycleId: number | null;
};

const initialValues: FormServiceSchema = {
  email: "",
  password: "",
  motorcycleId: null,
  productsId: [],
};

const formSchemaValues = Yup.object({});

export type FormServiceProps = {};

const FormService: FC<FormServiceProps> = () => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const routes = useRouter();

  const handleSubmit = async (values: FormServiceSchema) => {
    setLoading(true);

    setLoading(false);

    setFormError("Email ou senha inválido");
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
            <S.WrapperActionsForm>
              <Button
                icon={<ArrowBack />}
                size="medium"
                onClick={() => routes.push("/services")}
                type="button"
              >
                Voltar
              </Button>
              <Button icon={<Save />} size="medium" type="submit">
                Salvar
              </Button>
            </S.WrapperActionsForm>
            <S.WrapperTextFileds>
              <TextField
                name="email"
                label="Nome"
                placeholder="Nome do produto"
                type="text"
                error={errors.name}
                icon={<Email />}
                onInput={(value) => setFieldValue("name", value)}
                value={values.name}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <TextField
                name="price"
                label="Preço"
                placeholder="Preço do produto"
                type="text"
                error={errors.price}
                icon={<Email />}
                onInput={(value) => setFieldValue("price", value)}
                value={values.price}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <TextField
                name="quantity"
                label="Quantidade"
                type="number"
                error={errors.quantity}
                icon={<Email />}
                onInput={(value) => setFieldValue("quantity", value)}
                value={values.quantity}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <TextAreaField
                label="Descrição do produto"
                error={errors.description}
                value={values.description}
                onInput={(value) => setFieldValue("description", value)}
              />
            </S.WrapperTextFileds>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormService;
