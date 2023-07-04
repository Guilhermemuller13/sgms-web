import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    background: #ffffff;
    padding: ${theme.spacings.xxsmall};

    ${media.greaterThan("medium")`
      margin: ${theme.spacings.large} 0;
      position: relative;
      z-index: ${theme.layers.base};
    `};
  `}
`;

export const Cards = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.xxsmall};
    display: flex;
    justify-content: space-between;

    ${media.lessThan("medium")`
      flex-direction: column;
    `};
  `}
`;

export const Graphic = styled.div`
  ${({ theme }) => css`
    /* height: 50%; */
    display: flex;
    justify-content: center;
    width: 50%;
    align-items: center;
    flex-direction: column;
    background: #ffffff;
    border-radius: 0.8rem;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    padding: ${theme.spacings.xsmall};

    ${media.lessThan("medium")`
      width: 100%;
    `};
  `}
`;

export const GraphicTitle = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    width: 100%;
    font-weight: 600;
  `}
`;

export const WrapperDataGraphics = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    ${media.lessThan("medium")`
      flex-direction: column;
    `};
  `}
`;

export const ListUsers = styled.div`
  ${({ theme }) => css`
    display: flex;
    /* justify-content: center; */
    width: 50%;
    align-items: center;
    flex-direction: column;
    background: #ffffff;
    border-radius: 0.8rem;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    padding: ${theme.spacings.xsmall};

    div {
      width: 100%;
    }

    ${media.lessThan("medium")`
      width: 100%;
    `};
  `}
`;
