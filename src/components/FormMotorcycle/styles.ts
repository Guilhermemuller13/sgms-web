import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTextFileds = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    ${media.lessThan("medium")`
      flex-direction: column;
    `};
  `}
`;

export const WrapperActionsForm = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    height: 100%;
  `}
`;
