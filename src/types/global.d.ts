import type { GetServerSidePropsContext as OriginalGetServerSidePropsContext } from 'next/types';

import { UserSession } from './models';

declare module 'next' {
  export type GetServerSidePropsContext<
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  > = OriginalGetServerSidePropsContext<Q, D> & {
    req: {
      session: UserSession;
    };
  };

  export type GetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  > = (
    context: GetServerSidePropsContext<Q, D>
  ) => Promise<GetServerSidePropsResult<P>>;
}

export {};
