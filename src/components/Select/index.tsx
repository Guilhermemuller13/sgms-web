import {
  ChangeEvent,
  ReactElement,
  SelectHTMLAttributes,
  useState
} from 'react';

import * as S from './styles';

export type SelectProps = {
  onSelect?: (value: number) => void;
  initialValue?: number;
  label: string;
  disabled?: boolean;
  error?: string;
  children: ReactElement<HTMLOptionElement>[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onSelect'>;

const Select = ({
  onSelect,
  initialValue,
  label,
  disabled = false,
  error,
  ...props
}: SelectProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = +e.currentTarget.value;
    setValue(newValue);

    !!onSelect && onSelect(newValue);
  };

  return (
    <S.Wrapper>
      {!!label && <S.Label>{label}</S.Label>}
      <S.InputWrapper>
        <S.Select
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...props}
        ></S.Select>
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

export default Select;
