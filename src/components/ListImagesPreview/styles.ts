import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    margin-top: 1rem;
    display: flex;
    width: 100%;

    overflow-x: scroll;
  `}
`;

export const WrapperImage = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 30rem;
    margin: 0.5rem;

    button {
      position: absolute;
      left: 0;
      margin: 0.2rem;
    }
  `}
`;

export const Image = styled.img`
  ${({ theme }) => css`
    width: 100%;
    height: 15rem;
  `}
`;
