import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Email,
  ArrowBack,
  ErrorOutline,
  Save
} from '@styled-icons/material-outlined';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormError, FormWrapper } from 'components/Form';

import * as S from './styles';

export type FormMotorcycleSchema = {
  license_plate: string;
  year: string;
  engine_capacity: number;
  color: string;
  brand: string;
  name: string;
};

const initialValues: FormMotorcycleSchema = {
  license_plate: '',
  year: '',
  engine_capacity: 125,
  color: '',
  brand: '',
  name: ''
};

const formSchemaValues = Yup.object({});

export type FormMotorcycleProps = {
  handleSubmitForm: (values: FormMotorcycleSchema) => void;
  motorcycleForEdit?: FormMotorcycleSchema;
};

const FormMotorcycle = ({
  handleSubmitForm,
  motorcycleForEdit
}: FormMotorcycleProps) => {
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const routes = useRouter();

  const handleSubmit = async (values: FormMotorcycleSchema) => {
    handleSubmitForm(values);
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
        initialValues={motorcycleForEdit || initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <S.WrapperActionsForm>
              <Button
                icon={<ArrowBack />}
                size="medium"
                onClick={() => routes.push('/motorcycles')}
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
                name="name"
                label="Modelo da moto"
                placeholder="Modelo da moto"
                type="text"
                error={errors.name}
                icon={<Email />}
                onInput={(value) => setFieldValue('name', value)}
                value={values.name}
              />
              <TextField
                name="brand"
                label="Marca da moto"
                placeholder="Marca da moto"
                type="text"
                error={errors.brand}
                icon={<Email />}
                onInput={(value) => setFieldValue('brand', value)}
                value={values.brand}
              />
              <TextField
                name="license_plate"
                label="Placa da moto"
                placeholder="Placa da moto"
                type="text"
                error={errors.license_plate}
                icon={<Email />}
                onInput={(value) => setFieldValue('license_plate', value)}
                value={values.license_plate}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <TextField
                name="color"
                label="Cor da motor"
                placeholder="Cor da motor"
                type="text"
                error={errors.color}
                icon={<Email />}
                onInput={(value) => setFieldValue('color', value)}
                value={values.color}
              />
              <TextField
                name="engine_capacity"
                label="Potência"
                type="text"
                error={errors.engine_capacity}
                icon={<Email />}
                onInput={(value) => setFieldValue('engine_capacity', value)}
                value={values.engine_capacity}
              />
              <TextField
                name="year"
                label="Ano da moto"
                type="text"
                error={errors.year}
                icon={<Email />}
                onInput={(value) => setFieldValue('year', value)}
                value={values.year}
              />
            </S.WrapperTextFileds>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormMotorcycle;
