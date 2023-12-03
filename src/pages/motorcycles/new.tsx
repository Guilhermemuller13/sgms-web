import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Container from "../../components/Container";
import FormMotorcycle, {
  FormMotorcycleSchema,
} from "../../components/FormMotorcycle";
import Base from "../../templates/Base";

import { withSession } from "../../services/auth/session";

import { UserSession } from "../../types/models";

import * as S from "./styles";
import api from "../../services/api";
import { tokenService } from "../../services/auth/tokenService";

type MotorcycleNewProps = { session: UserSession; motorcyclesBrands: any };

const MotorcycleNew = ({ session, motorcyclesBrands }: MotorcycleNewProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormMotorcycleSchema) => {
    const token = tokenService.get({ context: null });

    const motorcycle = { ...values };

    try {
      const { data } = await api.post(`/motorcycles`, motorcycle, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return routes.push("/motorcycles");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormMotorcycle handleSubmitForm={handleSubmitForm} />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { session } = context.req;

    const token = tokenService.get({ context: context });

    const { data: motorcyclesBrands } = await api.get(`/motorcycles-brands`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      props: {
        session: session,
        motorcyclesBrands: motorcyclesBrands,
      },
    };
  },
  "manage:motorcycles"
);

export default MotorcycleNew;
