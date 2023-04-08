import {
  AnchorHTMLAttributes,
  InputHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction
} from 'react';

import * as S from './styles';

type InputTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | InputHTMLAttributes<HTMLInputElement>;

export type FileFieldProps = {} & InputTypes;

const FileField: ForwardRefRenderFunction<FileFieldProps, InputTypes> = (
  { ...props },
  ref
) => {
  return <S.Input ref={ref} type="file" {...props} />;
};

export default forwardRef(FileField);
