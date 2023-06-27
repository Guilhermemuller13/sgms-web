import { FC, Fragment, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ErrorOutline, ArrowBack, Save } from "@styled-icons/material-outlined";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "@styled-icons/bootstrap";
import { Trash } from "@styled-icons/boxicons-regular";

import Button from "components/Button";
import TextField from "components/TextField";
import { FormError, FormWrapper } from "components/Form";
import TextAreaField from "../TextAreaField";

import * as S from "./styles";
import { ListMotorcyclesProps } from "../ListMotorcycles";
import Select from "../Select";
import { ListUsersProps } from "../ListUsers";
import { ListProductsProps, Product } from "../ListProducts";

type ProductList = {
  id: string;
  productId: string;
  quantity: number;
};

export type FormServiceSchema = {
  description: string;
  name: string;
  products: ProductList[];
  motorcycleId: number;
  userId: number;
};

const initialValues: FormServiceSchema = {
  description: "",
  name: "",
  motorcycleId: 0,
  userId: 0,
  products: [],
};

const formSchemaValues = Yup.object({});

export type FormServiceProps = {
  handleSubmitForm: (values: FormServiceSchema) => void;
  loading?: boolean;
  errorForm?: string;
  serviceForEdit?: FormServiceSchema;
  listProducts?: ProductList[];
} & ListMotorcyclesProps &
  ListUsersProps &
  ListProductsProps;

const FormService: FC<FormServiceProps> = ({
  motorcycles = [],
  users = [],
  products = [],
  serviceForEdit,
  listProducts,
  handleSubmitForm,
}) => {
  console.log({ serviceForEdit });
  const [formError, setFormError] = useState("");
  const [productList, setProductList] = useState<ProductList[]>(
    listProducts || [
      {
        id: uuidv4(),
        productId: "0",
        quantity: 0,
      },
    ]
  );
  const [loading, setLoading] = useState(false);
  const routes = useRouter();

  const handleSubmit = async (values: FormServiceSchema) => {
    handleSubmitForm({ ...values, products: productList });
  };

  const handleDeleteProductList = (uuid: string) => {
    const productsUpdated = productList.filter(
      (product) => product.id !== uuid
    );

    setProductList(productsUpdated);
  };

  const handleNewProductList = () => {
    const productDefault = {
      id: uuidv4(),
      productId: "0",
      quantity: 0,
    };
    setProductList((prevState) => [...prevState, productDefault]);
  };

  const onChangeProduct = (uuid: string, value: string) => {
    const productsUpdated = productList.map((product) => {
      if (product.id === uuid) {
        return {
          ...product,
          productId: value,
        };
      }

      return product;
    });

    setProductList(productsUpdated);
  };

  const onChangeQuantityProduct = (uuid: string, value: number) => {
    const productsUpdated = productList.map((product) => {
      if (product.id === uuid) {
        return {
          ...product,
          quantity: value,
        };
      }

      return product;
    });

    setProductList(productsUpdated);
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
        initialValues={serviceForEdit || initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <S.WrapperActionsForm>
              <Button
                icon={<ArrowBack />}
                size="small"
                onClick={() => routes.push("/services")}
                type="button"
              >
                Voltar
              </Button>
              <Button icon={<Save />} size="small" type="submit">
                Salvar
              </Button>
            </S.WrapperActionsForm>
            <S.WrapperTextFileds>
              <TextField
                name="name"
                label="Nome"
                placeholder="Nome do serviço"
                type="text"
                error={errors.name}
                onInput={(value) => setFieldValue("name", value)}
                value={values.name}
              />
            </S.WrapperTextFileds>
            <S.WrapperTextFiledsSelect
              style={{ flexDirection: "row", gap: "0.5rem" }}
            >
              <Select
                label="Funcionário"
                defaultOption
                value={values.userId}
                onChange={(event) =>
                  setFieldValue("userId", +event.target.value)
                }
              >
                {users.map((user) => (
                  <option value={user.dataValues.id} key={user.dataValues.id}>
                    {user.dataValues.username}
                  </option>
                ))}
              </Select>
              <Select
                label="Motocicleta"
                defaultOption
                value={values.motorcycleId}
                onChange={(event) =>
                  setFieldValue("motorcycleId", +event.target.value)
                }
              >
                {motorcycles.map((motorcycle) => (
                  <option
                    value={motorcycle.dataValues.id}
                    key={motorcycle.dataValues.id}
                  >
                    {motorcycle.dataValues.brand} -{" "}
                    {motorcycle.dataValues.license_plate}
                  </option>
                ))}
              </Select>
            </S.WrapperTextFiledsSelect>
            <S.WrapperListProducts>
              <Button
                icon={<Plus />}
                size="small"
                onClick={handleNewProductList}
                type="button"
              >
                Produtos
              </Button>
              <S.ListProducts>
                {productList.map((product) => {
                  return (
                    <Fragment key={product.id}>
                      <S.ProductItem key={product.id}>
                        <Select
                          label="Produto"
                          defaultOption
                          value={product.productId}
                          onChange={(event) =>
                            onChangeProduct(product.id, event.target.value)
                          }
                        >
                          {products.map((productOption) => {
                            const isAlreadySelected = productList.find(
                              (p) =>
                                +p.productId === +productOption.dataValues.id
                            );

                            return (
                              <option
                                key={productOption.dataValues.id}
                                value={productOption.dataValues.id}
                                disabled={!!isAlreadySelected}
                              >
                                {productOption.dataValues.name}
                              </option>
                            );
                          })}
                        </Select>
                        <Select
                          label="Quantidade"
                          defaultOption
                          value={product.quantity}
                          onChange={(event) =>
                            onChangeQuantityProduct(
                              product.id,
                              +event.target.value
                            )
                          }
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </Select>
                        <Button
                          icon={<Trash />}
                          size="small"
                          onClick={() => handleDeleteProductList(product.id)}
                          type="button"
                        />
                      </S.ProductItem>
                    </Fragment>
                  );
                })}
              </S.ListProducts>
            </S.WrapperListProducts>
            <S.WrapperTextFileds>
              <TextAreaField
                label="Descrição do serviço"
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
