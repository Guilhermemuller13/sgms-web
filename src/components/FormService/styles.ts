import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTextFileds = styled.div`
  ${({ theme }) => css`
    display: flex;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}

    .react-select {
      flex-direction: column;
      padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall};
      width: 100%;
    }
  `}
`;

export const WrapperTextFiledsSelect = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall};
    width: 100%;
  `}
`;

export const WrapperActionsForm = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    height: 100%;
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    padding: 0 ${theme.spacings.xxsmall};
  `}
`;

export const WrapperListProducts = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
  `}
`;

export const WrapperTotalValueService = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacings.xxsmall};
    font-size: ${theme.font.sizes.xlarge};
    font-weight: ${theme.font.bold};
  `}
`;

export const ListProducts = styled.ul`
  ${({ theme }) => css`
    list-style: none;
  `}
`;

export const ProductItem = styled.li`
  ${({ theme }) => css`
    margin-bottom: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;

    > * {
      &:nth-child(2) {
        width: 50%;
      }
    }

    button {
      background: red;
    }
  `}
`;
