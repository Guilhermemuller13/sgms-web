import { FC, PropsWithChildren } from 'react';

import Menu from '../../components/Menu';
import Container from '../../components/Container';

import { UserSession } from '../../types/models';

export type BaseProps = { session?: UserSession };

const Base: FC<PropsWithChildren<BaseProps>> = ({ children, session }) => {
  return (
    <section>
      <Container>
        <Menu session={session} />
      </Container>
      {children}
    </section>
  );
};

export default Base;
