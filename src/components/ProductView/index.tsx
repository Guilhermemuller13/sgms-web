import { FC, PropsWithChildren } from "react";
import { ArrowBack, Edit } from "@styled-icons/material-outlined";
import { useRouter } from "next/router";

import Button from "../Button";
import ListImagesPreview from "../ListImagesPreview";

import { getImageUrl } from "../../utils/getImageUrl";

import * as S from "./styles";

export type ProductViewProps = {
  product: any;
};

const ProductView: FC<PropsWithChildren<ProductViewProps>> = ({ product }) => {
  const routes = useRouter();
  const files = JSON.parse(product.photos);

  return (
    <S.Wrapper>
      <S.WrapperActionsForm>
        <Button
          icon={<ArrowBack />}
          size="medium"
          onClick={() => routes.push("/products")}
          type="button"
        >
          Voltar
        </Button>
        <Button
          icon={<Edit />}
          size="medium"
          onClick={() => routes.push(`/products/edit/${product.id}`)}
          type="button"
        />
      </S.WrapperActionsForm>
      <S.WrapperContent>
        <S.Name>{product.name}</S.Name>

        <S.Description>{product.description}</S.Description>

        <ListImagesPreview
          files={files.map((file: any) => ({
            id: file.id,
            src: getImageUrl(file.src),
          }))}
        />
      </S.WrapperContent>
    </S.Wrapper>
  );
};

export default ProductView;
