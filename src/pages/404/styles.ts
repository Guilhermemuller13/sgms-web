import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: #ffffff;
    padding: ${theme.spacings.xxsmall};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    height: 75vh;

    ${media.greaterThan("medium")`
      margin: ${theme.spacings.large} 0;
      position: relative;
      z-index: ${theme.layers.base};
    `};
  `}
`;

export const NotFoundTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: 700;
  `}
`;

export const NotFoundMessage = styled.span``;
