import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Container from "../../components/Container";
import Base from "../../templates/Base";
import Button from "../../components/Button";

import ListServices, { ListServicesProps } from "../../components/ListServices";

import { withSession } from "../../services/auth/session";

import api from "../../services/api";
import { UserSession } from "../../types/models";
import { tokenService } from "../../services/auth/tokenService";

import * as S from "./styles";

type ServiceProps = { session: UserSession } & ListServicesProps;

const Services = ({ session, services }: ServiceProps) => {
  const routes = useRouter();

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <S.WrapperListActions>
            <Button onClick={() => routes.push("/services/new")}>Novo</Button>
          </S.WrapperListActions>
          <ListServices services={services} />
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
      const { data } = await api.get(`/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        props: {
          services: data,
          session: session,
        },
      };
    } catch (error) {
      return {
        props: {
          services: [],
          session: session,
        },
      };
    }
  },
  "manage:services"
);

export default Services;
