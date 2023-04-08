import { GetServerSidePropsContext } from 'next';
import { deleteCookie, getCookies, setCookie } from 'cookies-next';

// import nookies from 'nookies';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

type SessionPayload = {
  context: GetServerSidePropsContext | null;
};

export const tokenService = {
  save(accessToken: string, { context = null }: SessionPayload) {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {
      ...context,
      maxAge: ONE_DAY,
      path: '/'
    });
  },
  get({ context = null }: SessionPayload) {
    const cookies = getCookies({ ...context });
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete() {
    deleteCookie(ACCESS_TOKEN_KEY);
  }
};
