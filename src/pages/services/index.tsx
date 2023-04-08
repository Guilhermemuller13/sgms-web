import { GetServerSidePropsContext } from 'next';

import Container from 'components/Container';
import Base from 'templates/Base';

import { withSession } from '../../services/auth/session';

import { UserSession } from '../../types/models';

import * as S from './styles';

type ServiceProps = { session: UserSession };

const Services = ({ session }: ServiceProps) => {
  return (
    <Base session={session}>
      <Container>
        <S.Wrapper></S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { session } = context.req;

    return {
      props: {
        session: session
      }
    };
  },
  'manage:services'
);

export default Services;
