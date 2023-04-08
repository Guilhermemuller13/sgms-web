import { GetServerSidePropsContext } from 'next';

import Base from 'templates/Base';
import Container from 'components/Container';
import FormService from 'components/FormService';

import { UserSession } from '../../types/models';
import { withSession } from '../../services/auth/session';

import * as S from './styles';

type ServiceEditProps = { session: UserSession };

const ServiceEdit = ({ session }: ServiceEditProps) => {
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

export default ServiceEdit;
