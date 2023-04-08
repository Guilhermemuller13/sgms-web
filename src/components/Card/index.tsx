import { useState } from 'react';

import * as S from './styles';

export type CardProps = {
  imageSrc?: string;
  title: string;
  description?: string;
  price?: string;
};

const Card = ({
  imageSrc = '',
  title = '',
  description = '',
  price = '',
  ...props
}: CardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(imageSrc);

  const onErrorImage = () => {
    console.error('erro');
    setImageUrl('/img/no-image.jpg');
  };

  return (
    <S.Wrapper {...props}>
      {!!imageSrc && (
        <S.Header>
          <S.Image src={imageUrl} onError={onErrorImage} />
        </S.Header>
      )}
      <S.Body>
        <S.Title>{title}</S.Title>
        {!!description && <S.Text>{description}</S.Text>}
      </S.Body>
      {!!price && (
        <S.Footer>
          <S.Price>R${price}</S.Price>
        </S.Footer>
      )}
    </S.Wrapper>
  );
};

export default Card;
