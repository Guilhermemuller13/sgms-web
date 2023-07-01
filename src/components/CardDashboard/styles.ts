import styled, { css } from "styled-components";
import media from "styled-media-query";

export const Wrapper = styled.main`
  ${() => css`
    width: 100%;
    height: 12rem;
    background: #ffffff;
    border-radius: 0.8rem;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export const Body = styled.div`
  ${() => css`
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    text-align: center;
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    width: 100%;
    overflow: hidden !important;
    text-overflow: ellipsis;
    color: #cccccc;
  `}
`;
