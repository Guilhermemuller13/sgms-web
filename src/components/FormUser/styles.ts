import styled, { css } from "styled-components";
import media from "styled-media-query";

export const WrapperTextFields = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

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
