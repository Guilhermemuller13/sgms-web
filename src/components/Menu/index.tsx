import { useState, FC } from 'react';
import Link from 'next/link';
import { Close as CloseIcon } from 'styled-icons/material-outlined';
import { Menu2 as MenuIcon } from 'styled-icons/remix-fill';

import Logo from '../Logo';
import Button from '../Button';
import MediaMatch from '../MediaMatch';
import UserDropdown from '../UserDropdown';

import { UserSession } from '../../types/models';

import * as S from './styles';

export type MenuProps = {
  session?: UserSession;
};

const Menu: FC<MenuProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!session;

  const renderPrivateMenus = () => {
    if (!session) {
      return null;
    }

    const canViewUsers =
      session.permission.permissions.includes('manage:users');

    if (canViewUsers) {
      return (
        <Link href="/users" passHref>
          <S.MenuLink>Usuários</S.MenuLink>
        </Link>
      );
    }

    return null;
  };

  return (
    <S.Wrapper>
      <MediaMatch lessThan="medium">
        <S.IconWrapper>
          <MenuIcon aria-label="Open Menu" onClick={() => setIsOpen(true)} />
        </S.IconWrapper>
      </MediaMatch>
      <S.LogoWrapper>
        <Logo hideOnMobile />
      </S.LogoWrapper>

      <MediaMatch greaterThan="medium">
        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>
          <Link href="/motorcycles" passHref>
            <S.MenuLink>Motos</S.MenuLink>
          </Link>
          <Link href="/services" passHref>
            <S.MenuLink>Serviços</S.MenuLink>
          </Link>
          <Link href="/products" passHref>
            <S.MenuLink>Produtos</S.MenuLink>
          </Link>
          {renderPrivateMenus()}
        </S.MenuNav>
      </MediaMatch>

      <S.MenuGroup>
        {!isAuthenticated ? (
          <>
            <MediaMatch greaterThan="medium">
              <Link href="/sign-in" passHref>
                <Button>Login</Button>
              </Link>
            </MediaMatch>
          </>
        ) : (
          <UserDropdown username={session.user.name} />
        )}
      </S.MenuGroup>

      <S.MenuFull aria-hidden={!isOpen} isOpen={isOpen}>
        <CloseIcon aria-label="Fechar Menu" onClick={() => setIsOpen(false)} />
        <S.MenuNav>
          <Link href="/" passHref>
            <S.MenuLink>Home</S.MenuLink>
          </Link>
          <Link href="/motorcycles" passHref>
            <S.MenuLink>Motos</S.MenuLink>
          </Link>
          <Link href="/services" passHref>
            <S.MenuLink>Serviços</S.MenuLink>
          </Link>
          <Link href="/products" passHref>
            <S.MenuLink>Produtos</S.MenuLink>
          </Link>
          {renderPrivateMenus()}
        </S.MenuNav>

        {!isAuthenticated && (
          <S.RegisterBox>
            <Link href="/sign-in" passHref>
              <Button fullWidth size="large">
                Login
              </Button>
            </Link>
            <span>ou</span>
            <Link href="/sign-up" passHref>
              <S.CreateAccount href="#" title="Sign up">
                Cadastrar
              </S.CreateAccount>
            </Link>
          </S.RegisterBox>
        )}
      </S.MenuFull>
    </S.Wrapper>
  );
};

export default Menu;
