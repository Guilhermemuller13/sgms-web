import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Container from "../../components/Container";
import Base from "../../templates/Base";
import FormMotorcycle from "../../components/FormMotorcycle";

import api from "../../services/api";
import { tokenService } from "../../services/auth/tokenService";
import { withSession } from "../../services/auth/session";

import { UserSession } from "../../types/models";

import * as S from "./styles";

type MotorcycleEditProps = {
  motorcycle: any;
  motorcycleId: number;
  session: UserSession;
};

const MotorcycleEdit = ({
  motorcycle,
  motorcycleId,
  session,
}: MotorcycleEditProps) => {
  const handleSubmitForm = async (values: any) => {
    const routes = useRouter();

    const token = tokenService.get({ context: null });

    const motorcycle = { ...values };
    try {
      const { data } = await api.put(
        `/motorcycles/${motorcycleId}`,
        motorcycle,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return routes.push("/motorcycles");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormMotorcycle
            handleSubmitForm={handleSubmitForm}
            motorcycleForEdit={{
              license_plate: motorcycle.license_plate,
              year: motorcycle.year,
              engine_capacity: +motorcycle.engine_capacity,
              color: motorcycle.color,
              brand: motorcycle.brand,
              name: motorcycle.name,
            }}
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
      const { data } = await api.get(
        `/motorcycles/${context.params.motorcycleid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        props: {
          motorcycle: data.dataValues,
          motorcycleId: +context.params.motorcycleid,
          session: session,
        },
      };
    } catch (error) {
      return {
        props: {
          motorcycle: undefined,
          session: session,
        },
      };
    }
  },
  "manage:motorcycles"
);

export default MotorcycleEdit;
