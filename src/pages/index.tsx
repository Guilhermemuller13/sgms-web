import { GetServerSidePropsContext } from 'next';

import Base from '../templates/Base';
import Container from '../components/Container';

import { withSession } from '../services/auth/session';

import { UserSession } from '../types/models';

import * as S from './home/styles';

export type HomeTemplateProps = { session: UserSession };

const Index = ({ session }: HomeTemplateProps) => {
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
  'view:home'
);

export default Index;
