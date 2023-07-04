import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Edit } from "@styled-icons/material-outlined";
import { Trash } from "styled-icons/bootstrap";

import Button from "../Button";

import * as S from "./styles";
import { usersService } from "../../services/users";
import { UserSession } from "../../types/models";

type User = {
  dataValues: {
    username: string;
    email: string;
    id: string;
  };
};

export type ListUsersProps = {
  users: User[];
  currentUser?: UserSession;
};

const ListUsers = ({ users, currentUser }: ListUsersProps) => {
  const MySwal = withReactContent(Swal);

  const routes = useRouter();

  const handleEditUser = (id: string) => {
    return routes.push(`/users/${id}`);
  };

  const handleDeleteUser = (id: number) => {
    MySwal.fire({
      title: "Você tem certeza?",
      text: "Isso não poderá ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, remover!",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        usersService.delete({ id }).then(() => routes.push(`/users/`));
      }
    });
  };

  const renderUser = () => {
    return (users || []).map((user) => (
      <S.UserWrapper key={user.dataValues.id}>
        <S.UserData>
          <S.UserName>{user.dataValues.username}</S.UserName>
          <S.UserEmail>{user.dataValues.email}</S.UserEmail>
        </S.UserData>
        <S.Actions>
          <Button
            icon={<Edit />}
            size="small"
            onClick={() => handleEditUser(user.dataValues.id)}
          />
          {currentUser.user.email !== user.dataValues.email && (
            <Button
              icon={<Trash />}
              size="small"
              onClick={() => handleDeleteUser(+user.dataValues.id)}
            />
          )}
        </S.Actions>
      </S.UserWrapper>
    ));
  };

  return <S.Wrapper>{renderUser()}</S.Wrapper>;
};

export default ListUsers;
