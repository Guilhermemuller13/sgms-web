import Link from "next/link";

import Button from "../../components/Button";
import Container from "../../components/Container";
import Base from "../../templates/Base";

import * as S from "./styles";

const Page404 = () => {
  return (
    <Base>
      <Container>
        <S.Wrapper>
          <S.NotFoundTitle>Opss...</S.NotFoundTitle>
          <S.NotFoundMessage>Página não encontrada.</S.NotFoundMessage>
          <Link href="/">
            <Button>Página inicial</Button>
          </Link>
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export default Page404;
