import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    align-items: center;
    grid-gap: 0.5rem;
    padding: ${theme.spacings.xxsmall};
  `}
`;

export const UserWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    width: 24rem;
    height: 15rem;
    padding: ${theme.spacings.xsmall};
  `}
`;

export const UserData = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    height: 75%;
  `}
`;

export const UserName = styled.span`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
  `}
`;

export const UserEmail = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
  `}
`;

export const Actions = styled.div`
  ${() => css`
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 7rem;
    justify-content: space-between;
  `}
`;
