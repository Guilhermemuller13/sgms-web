import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef
} from 'react';
import * as S from './styles';

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  minimal?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
} & ButtonTypes;

const Button: ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    icon,
    size = 'medium',
    fullWidth = false,
    minimal = false,
    children,
    ...props
  },
  ref
) => {
  return (
    <S.Wrapper
      size={size}
      fullWidth={fullWidth}
      minimal={minimal}
      hasIcon={!!icon}
      ref={ref}
      {...props}
    >
      {!!icon && icon}
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  );
};

export default forwardRef(Button);
