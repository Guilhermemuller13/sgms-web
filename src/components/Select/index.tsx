import { ReactElement, SelectHTMLAttributes } from "react";

import * as S from "./styles";

export type SelectProps = {
  onSelect?: (value: number) => void;
  initialValue?: number;
  label?: string;
  disabled?: boolean;
  error?: string;
  children: ReactElement<HTMLOptionElement>[];
  defaultOption?: boolean;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onSelect">;

const Select = ({
  onSelect,
  initialValue,
  label,
  disabled = false,
  error,
  children,
  defaultOption = false,
  ...props
}: SelectProps) => {
  return (
    <S.Wrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.InputWrapper>
        <S.Select disabled={disabled} {...props}>
          {defaultOption && <option value="0">Selecione</option>}
          {children}
        </S.Select>
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default Select;
