import { FC } from 'react';
import Link from 'next/link';

import Heading from 'components/Heading';
import Logo from 'components/Logo';

import * as S from './styles';

type AuthProps = { title: string };

const Auth: FC<AuthProps> = ({ title, children }) => (
  <S.Wrapper>
    <S.BannerBlock>
      <S.BannerContent>
        <Link href="/">
          <a>
            <Logo id="banner" />
          </a>
        </Link>

        {/* <div>
          <Heading size="huge">All your favorite games in one place</Heading>
          <S.SubTitle>
            <strong>WON</strong> is the best and most complete gaming platform.
          </S.SubTitle>
        </div> */}
        <S.Footer></S.Footer>
      </S.BannerContent>
    </S.BannerBlock>

    <S.Content>
      <S.ContentWrapper>
        <Link href="/">
          <a>
            <Logo color="black" size="large" id="content" />
          </a>
        </Link>
        <Heading color="black" lineColor="secondary" lineLeft>
          {title}
        </Heading>
        {children}
      </S.ContentWrapper>
    </S.Content>
  </S.Wrapper>
);

export default Auth;
