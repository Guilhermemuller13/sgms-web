import { GetServerSidePropsContext } from 'next';

import Base from 'templates/Base';
import Container from 'components/Container';
import FormService from 'components/FormService';

import { withSession } from '../../services/auth/session';

import { UserSession } from '../../types/models';

import * as S from './styles';

type ServiceNewProps = { session: UserSession };

const ServiceNew = ({ session }: ServiceNewProps) => {
  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormService />
        </S.Wrapper>
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

export default ServiceNew;
