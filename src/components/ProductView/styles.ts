import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  ${({ theme }) => css``}
`;

export const WrapperContent = styled.main`
  ${({ theme }) =>
    css`
      padding: 2rem;
    `}
`;

export const Name = styled.h1`
  ${({ theme }) => css``}
`;

export const Description = styled.h3`
  ${({ theme }) => css``}
`;

export const WrapperActionsForm = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    height: 100%;
  `}
`;
