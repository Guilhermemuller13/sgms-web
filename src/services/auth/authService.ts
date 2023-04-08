import { GetServerSidePropsContext } from 'next';

import { tokenService } from './tokenService';

import api from '../api';
import { AxiosResponse } from 'axios';

type AuthSchema = {
  email: string;
  password: string;
};

type AuthPayload = {
  permission: any;
  token: string;
  user: any;
};

type SessionPayload = {
  context: GetServerSidePropsContext | null;
};

export const authService = {
  async login({ email, password }: AuthSchema) {
    return await api
      .post<AuthPayload>('/auth/session', {
        email: email,
        password: password
      })
      .then(({ data }) => {
        tokenService.save(data.token, { context: null });
      });
  },
  async getSession({ context = null }: SessionPayload) {
    const token = tokenService.get({ context: context });
    return await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
