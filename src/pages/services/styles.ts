import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    min-height: 75vh;
    background: #ffffff;
    border-radius: 0.5rem;
    padding: ${theme.spacings.xxsmall};

    ${media.greaterThan("medium")`
      margin: ${theme.spacings.large} 0;
      position: relative;
      z-index: ${theme.layers.base};
    `};
  `}
`;

export const WrapperListActions = styled.div`
  ${() => css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `}
`;
