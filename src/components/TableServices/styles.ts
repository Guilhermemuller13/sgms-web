import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 6rem;
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const TableBody = styled.tbody`
  ${({ theme }) => css`
    text-align: center;

    tr:nth-child(odd) {
      > td,
      > th {
        background-color: #e8e8e8;
      }
    }
  `}
`;
