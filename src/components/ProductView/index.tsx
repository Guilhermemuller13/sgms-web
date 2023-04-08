import { FC, PropsWithChildren } from 'react';
import { ArrowBack, Edit } from '@styled-icons/material-outlined';
import { useRouter } from 'next/router';

import Button from '../Button';
import ListImagesPreview from '../ListImagesPreview';

import * as S from './styles';

export type ProductViewProps = {
  product: any;
};

const ProductView: FC<PropsWithChildren<ProductViewProps>> = ({ product }) => {
  const routes = useRouter();
  const files = JSON.parse(product.photos);

  console.log({ product });

  return (
    <S.Wrapper>
      <S.WrapperActionsForm>
        <Button
          icon={<ArrowBack />}
          size="medium"
          onClick={() => routes.push('/products')}
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
          files={files.map((file) => ({
            id: file.id,
            src: `${file.base_url}/${file.src}`
          }))}
        />
      </S.WrapperContent>
    </S.Wrapper>
  );
};

export default ProductView;
