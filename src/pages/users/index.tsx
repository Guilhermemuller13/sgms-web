import { FC, PropsWithChildren } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Base from 'templates/Base';
import Container from '../../components/Container';
import Button from '../../components/Button';
import ListUsers, { ListUsersProps } from '../../components/ListUsers';
import { tokenService } from '../../services/auth/tokenService';

import api from '../../services/api';
import { UserSession } from '../../types/models';
import { withSession } from '../../services/auth/session';

import * as S from './styles';

type UsersProps = { session: UserSession } & ListUsersProps;

const Users: FC<PropsWithChildren<UsersProps>> = ({ users, session }) => {
  const routes = useRouter();

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <S.WrapperListActions>
            <Button onClick={() => routes.push('/users/new')}>Novo</Button>
          </S.WrapperListActions>
          <ListUsers users={users} currentUser={session} />
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
      const { data } = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        props: {
          users: data,
          session: session
        }
      };
    } catch (error) {
      return {
        props: {
          users: [],
          session: session
        }
      };
    }
  },
  'view:users'
);

export default Users;
