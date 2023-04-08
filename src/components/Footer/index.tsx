import { FC } from 'react';

import * as S from './styles';

export type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <S.Wrapper>
      <S.Copyright>
        Sistema para o gerenciamento de oficinas de motocicletas
      </S.Copyright>
    </S.Wrapper>
  );
};

export default Footer;
