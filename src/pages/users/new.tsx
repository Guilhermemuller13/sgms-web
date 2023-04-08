import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Container from '../../components/Container';
import FormUser, { FormUserSchema } from '../../components/FormUser';
import Base from '../../templates/Base';

import api from '../../services/api';
import { tokenService } from '../../services/auth/tokenService';
import { withSession } from '../../services/auth/session';

import { UserSession } from '../../types/models';

import * as S from './styles';

type UsersNewProps = { session: UserSession };

const UserNew = ({ session }: UsersNewProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormUserSchema) => {
    const token = tokenService.get({ context: null });
    try {
      const { data } = await api.post(
        '/users',
        {
          username: values.username,
          email: values.email,
          role_id: values.role_id
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return routes.push('/users');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormUser handleSubmitForm={handleSubmitForm} />
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
  'manage:users'
);

export default UserNew;
