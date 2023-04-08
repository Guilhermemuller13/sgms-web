import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Email,
  ArrowBack,
  ErrorOutline,
  Save,
  FileUpload
} from '@styled-icons/material-outlined';
import { v4 as uuidv4 } from 'uuid';

import Button from 'components/Button';
import TextField from 'components/TextField';
import { FormError, FormWrapper } from 'components/Form';
import FileField from '../FileField';

import * as S from './styles';
import ListImagesPreview, { ListFilesBlob } from '../ListImagesPreview';
import { fileToBlob } from '../../services/files';

export type FormProductSchema = {
  name: string;
  code: string;
  description: string;
  brand: string;
  quantity: number;
  quantity_minimum: number;
  available: boolean;
  price: string;
  photos: ListFilesBlob[];
  updatedFiles?: ListFilesBlob[];
};

const initialValues: FormProductSchema = {
  name: '',
  code: '',
  description: '',
  brand: '',
  price: '',
  quantity: 0,
  quantity_minimum: 0,
  available: false,
  photos: [],
  updatedFiles: []
};

const formSchemaValues = Yup.object({});

export type FormProductProps = {
  handleSubmitForm: (values: FormProductSchema) => void;
  loading?: boolean;
  errorForm?: string;
  productForEdit?: FormProductSchema;
};

const FormProduct = ({
  handleSubmitForm,
  loading = false,
  errorForm = '',
  productForEdit
}: FormProductProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState('');
  const [blobImages, setBlobImages] = useState<ListFilesBlob[]>([]);
  const routes = useRouter();

  const handleSubmit = async (values: FormProductSchema) => {
    handleSubmitForm({ ...values, updatedFiles: blobImages });
  };

  const handleAttachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const converFileToBlob = (file: File, id: string) => {
    setBlobImages((prevState) => [
      ...prevState,
      { src: fileToBlob(file), id: id, file: file }
    ]);
  };

  const handleDeleteFile = (fileId: string) => {
    const fileToDelete = blobImages.find((file) => file.id === fileId);

    URL.revokeObjectURL(fileToDelete!.src);

    const newBlobFiles = blobImages.filter((file) => file.id !== fileId);
    setBlobImages(newBlobFiles);
  };

  useEffect(() => setFormError(errorForm), [errorForm]);

  useEffect(() => {
    if (productForEdit?.photos) {
      const files = productForEdit.photos.map((file) => ({
        id: file.id,
        src: `${file.base_url}/${file.src}`
      }));

      setBlobImages(files);
    }
  }, [productForEdit]);

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <Formik
        validationSchema={formSchemaValues}
        initialValues={productForEdit || initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <S.WrapperActionsForm>
              <Button
                icon={<ArrowBack />}
                size="medium"
                onClick={() => routes.push('/products')}
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
                onInput={(value) => setFieldValue('name', value)}
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
                onInput={(value) => setFieldValue('price', value)}
                value={values.price}
              />
              <TextField
                name="code"
                label="Código"
                placeholder="Código do produto"
                type="text"
                error={errors.code}
                icon={<Email />}
                onInput={(value) => setFieldValue('code', value)}
                value={values.code}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <TextField
                name="brand"
                label="Marca"
                placeholder="Marca do produto"
                type="text"
                error={errors.brand}
                icon={<Email />}
                onInput={(value) => setFieldValue('brand', value)}
                value={values.brand}
              />
              <TextField
                name="quantity"
                label="Quantidade"
                type="number"
                error={errors.quantity}
                icon={<Email />}
                onInput={(value) => setFieldValue('quantity', value)}
                value={values.quantity}
              />
              <TextField
                name="quantity_minimum"
                label="Quantidade mínima"
                type="number"
                error={errors.quantity_minimum}
                icon={<Email />}
                onInput={(value) => setFieldValue('quantity_minimum', value)}
                value={values.quantity_minimum}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <FileField
                accept="image/png, image/jpeg"
                ref={fileInputRef}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const files = event.currentTarget.files;
                  if (files) {
                    const file = Array.from(files)[0];
                    const id = uuidv4();

                    converFileToBlob(file, id);

                    setFieldValue('photos', [
                      ...values.photos,
                      { file, id: id }
                    ]);
                  }

                  event.target.value = '';
                }}
              />
              <Button
                icon={<FileUpload />}
                size="medium"
                onClick={handleAttachFile}
                type="button"
                disabled={blobImages.length === 5}
              >
                Anexar imagem
              </Button>
              <S.MaxListFiles>Máximo de 5 arquivos</S.MaxListFiles>
              {/* <Checkbox
                name="available"
                onCheck={(value) => setFieldValue('available', value)}
                isChecked={values.available}
                label="Produto disponível para visualização?"
                labelFor="available"
                labelColor="black"
              /> */}
            </S.WrapperTextFileds>
            <S.WrapperTextFileds>
              <ListImagesPreview
                files={blobImages}
                onRemoveFile={handleDeleteFile}
              />
            </S.WrapperTextFileds>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormProduct;
