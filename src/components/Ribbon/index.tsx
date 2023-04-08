import { FC } from 'react';
import * as S from './styles';

export type RibbonColors = 'primary' | 'secondary';
export type RibbonSize = 'normal' | 'small';

export type RibbonProps = {
  children: React.ReactNode;
  color?: RibbonColors;
  size?: RibbonSize;
};

const Ribbon: FC<RibbonProps> = ({
  children,
  color = 'primary',
  size = 'normal'
}) => {
  return (
    <S.Wrapper color={color} size={size}>
      {children}
    </S.Wrapper>
  );
};

export default Ribbon;
