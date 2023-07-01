import styled, { css } from "styled-components";

export const Wrapper = styled.main`
  ${({ theme }) => css`
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    align-items: center;
    grid-gap: 3px;
    padding: ${theme.spacings.xxsmall}; */ */
  `}
`;

export const MotorcycleWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    box-shadow: 0.2rem 0.2rem 0.6rem #d9d9d9d9, -0.2rem -0.2rem 0.6rem #ffffff;
    width: 20rem;
    height: 20rem;
    padding: ${theme.spacings.xsmall};
    cursor: pointer;
    float: left;
  `}
`;

export const Brand = styled.span`
  ${({ theme }) => css`
    font-weight: 700;
  `}
`;

export const Year = styled.span`
  ${({ theme }) => css``}
`;

export const Engine = styled.span`
  ${({ theme }) => css``}
`;

export const LicensePlate = styled.span`
  ${({ theme }) => css``}
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
    height: 100%;
    display: flex;
    align-items: flex-end;
  `}
`;
