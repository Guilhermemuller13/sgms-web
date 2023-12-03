import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import Container from '../../components/Container';
import FormUser from '../../components/FormUser';
import Base from '../../templates/Base';

import api from '../../services/api';
import { tokenService } from '../../services/auth/tokenService';
import { withSession } from '../../services/auth/session';

import { UserSession } from '../../types/models';

import * as S from './styles';

type UserEditProps = {
  user: any;
  userId: number;
  session: UserSession;
};

const UserEdit = ({ user: { dataValues }, userId, session }: UserEditProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: any) => {
    const token = tokenService.get({ context: null });
    try {
      const { data } = await api.put(
        `/users/${userId}`,
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
          <FormUser
            handleSubmitForm={handleSubmitForm}
            userForEdit={{
              email: dataValues.email,
              role_id: dataValues.role_id,
              username: dataValues.username,
              password: ''
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
      const { data } = await api.get(`/users/${context.params.userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        props: {
          user: data,
          userId: +context.params.userid,
          session: session
        }
      };
    } catch (error) {
      return {
        props: {
          user: undefined,
          session: session
        }
      };
    }
  },
  'manage:users'
);

export default UserEdit;
