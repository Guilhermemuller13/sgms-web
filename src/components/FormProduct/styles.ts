import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTextFileds = styled.div`
  ${({ theme }) => css`
    display: flex;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`;

export const WrapperTextFiledFile = styled.div`
  ${({ theme }) => css`
    display: flex;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall};

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  `}
`;

export const WrapperActionsForm = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    height: 100%;
  `}
`;

export const MaxListFiles = styled.span`
  ${({ theme }) => css`
    margin-left: 0.2rem;
    height: 4rem;
    text-align: center;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    font-weight: 700;
  `}
`;
