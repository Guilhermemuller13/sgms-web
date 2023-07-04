import { useState } from "react";

import * as S from "./styles";

export type CardDashboardProps = {
  title: string;
  description: string;
};

const CardDashboard = ({
  title = "",
  description = "",
  ...props
}: CardDashboardProps) => {
  return (
    <S.Wrapper {...props}>
      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Text>{description}</S.Text>
      </S.Body>
    </S.Wrapper>
  );
};

export default CardDashboard;
