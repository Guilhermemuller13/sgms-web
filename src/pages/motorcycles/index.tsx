import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Container from '../../components/Container';
import Base from '../../templates/Base';

import ListMotorcycles, {
  ListMotorcyclesProps
} from '../../components/ListMotorcycles';
import Button from '../../components/Button';

import api from '../../services/api';
import { withSession } from '../../services/auth/session';
import { tokenService } from '../../services/auth/tokenService';

import { UserSession } from '../../types/models';

import * as S from './styles';

type MotorcyclesProps = { session: UserSession } & ListMotorcyclesProps;

const Motorcycles = ({ motorcycles, session }: MotorcyclesProps) => {
  const routes = useRouter();

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <S.WrapperListActions>
            <Button onClick={() => routes.push('/motorcycles/new')}>
              Novo
            </Button>
          </S.WrapperListActions>
          <ListMotorcycles motorcycles={motorcycles} />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps: GetServerSideProps<ListMotorcyclesProps> =
  withSession(async (context: GetServerSidePropsContext) => {
    const { session } = context.req;

    const token = tokenService.get({ context: context });

    try {
      const { data } = await api.get(`/motorcycles`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        props: {
          motorcycles: data,
          session: session
        }
      };
    } catch (error) {
      return {
        props: {
          motorcycles: [],
          session: session
        }
      };
    }
  }, 'manage:motorcycles');

export default Motorcycles;
