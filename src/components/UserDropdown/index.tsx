import Link from "next/link";
import { useRouter } from "next/router";
import { AccountCircle, ExitToApp } from "@styled-icons/material-outlined";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";

import Dropdown from "../Dropdown";

import { tokenService } from "../../services/auth/tokenService";

import * as S from "./styles";

export type UserDropdownProps = {
  username: string;
};

const UserDropdown = ({ username }: UserDropdownProps) => {
  const { push } = useRouter();

  const handleSignOut = async () => {
    tokenService.delete();
    push("/sign-in");
  };

  return (
    <Dropdown
      title={
        <>
          <AccountCircle size={24} />
          <S.Username>{username}</S.Username>
          <ChevronDown size={24} />
        </>
      }
    >
      <S.Nav>
        {/* <Link href="/profile/me" passHref>
          <S.Link>
            <AccountCircle />
            <span>My profile</span>
          </S.Link>
        </Link> */}

        <S.Link role="button" title="Sign out" onClick={handleSignOut}>
          <ExitToApp />
          <span>Sair</span>
        </S.Link>
      </S.Nav>
    </Dropdown>
  );
};

export default UserDropdown;
