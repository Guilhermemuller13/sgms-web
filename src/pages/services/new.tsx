import { GetServerSidePropsContext } from "next";

import Base from "templates/Base";
import Container from "components/Container";
import FormService, { FormServiceSchema } from "components/FormService";

import { withSession } from "../../services/auth/session";

import { UserSession } from "../../types/models";

import * as S from "./styles";
import { tokenService } from "../../services/auth/tokenService";
import api from "../../services/api";
import { ListMotorcyclesProps } from "../../components/ListMotorcycles";
import { ListUsersProps } from "../../components/ListUsers";
import { ListProductsProps } from "../../components/ListProducts";
import { useRouter } from "next/router";

type ServiceNewProps = { session: UserSession } & ListMotorcyclesProps &
  ListUsersProps &
  ListProductsProps;

const ServiceNew = ({
  session,
  motorcycles,
  users,
  products,
}: ServiceNewProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormServiceSchema) => {
    const token = tokenService.get({ context: null });

    const service = { ...values };

    try {
      const { data } = await api.post(`/services/`, service, {
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
          session: session,
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

export default ServiceNew;
