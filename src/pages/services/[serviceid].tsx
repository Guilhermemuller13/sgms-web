import { GetServerSidePropsContext } from "next";
import { v4 as uuidv4 } from "uuid";

import Base from "templates/Base";
import Container from "components/Container";
import FormService, { FormServiceSchema } from "components/FormService";

import { UserSession } from "../../types/models";
import { withSession } from "../../services/auth/session";

import * as S from "./styles";
import { useRouter } from "next/router";
import { tokenService } from "../../services/auth/tokenService";
import api from "../../services/api";
import { ListMotorcyclesProps } from "../../components/ListMotorcycles";
import { ListUsersProps } from "../../components/ListUsers";
import { ListProductsProps } from "../../components/ListProducts";

type ServiceEditProps = {
  session: UserSession;
  service: any;
  serviceid: number;
} & ListMotorcyclesProps &
  ListUsersProps &
  ListProductsProps;

const ServiceEdit = ({
  session,
  motorcycles,
  users,
  products,
  service: { service, products: listProducts },
  serviceid,
}: ServiceEditProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormServiceSchema) => {
    const token = tokenService.get({ context: null });
    const service = { ...values };

    try {
      const { data } = await api.put(`/services/${serviceid}`, service, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return routes.push("/services");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormService
            motorcycles={motorcycles}
            users={users}
            products={products}
            handleSubmitForm={handleSubmitForm}
            serviceForEdit={{
              ...service.dataValues,
              motorcycleId: service.dataValues.motorcycle_id,
              userId: service.dataValues.user_id,
            }}
            listProducts={listProducts.map(({ dataValues: product }: any) => ({
              productId: product.product_id,
              quantity: product.quantity,
              id: uuidv4(),
            }))}
          />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { session } = context.req;

    const token = tokenService.get({ context: context });

    try {
      const { data: service } = await api.get(
        `/services/${context.params.serviceid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data: motorcycles } = await api.get(`/motorcycles`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: users } = await api.get(`/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: products } = await api.get(`/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        props: {
          motorcycles: motorcycles,
          users: users,
          products: products,
          service: service,
          session: session,
          serviceid: +context.params.serviceid,
        },
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/services",
        },
      };
    }
  },
  "manage:services"
);

export default ServiceEdit;
