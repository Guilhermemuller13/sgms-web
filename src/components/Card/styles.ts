import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  ${() => css`
    width: 22rem;
    height: 30rem;
    max-height: 30rem;
    background: #ffffff;
    border-radius: 0.8rem;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    padding: 0.5rem;
    margin: 0.5rem;
    cursor: pointer;
  `}
`;

export const Header = styled.div`
  ${() => css`
    height: 50%;
    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;
  `}
`;

export const Body = styled.div`
  ${() => css`
    height: 30%;
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    line-height: 1.2;
    max-height: 70%;
    width: 100%;
    overflow: hidden !important;
    text-overflow: ellipsis;
  `}
`;

export const Price = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    background: rgb(244, 244, 242);
    width: fit-content;
    padding: 0.5rem;
    border-radius: 0.8rem;
  `}
`;

export const Footer = styled.div`
  ${() => css`
    height: 20%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  `}
`;

export const Image = styled.img`
  ${() => css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.6rem;
  `}
`;
