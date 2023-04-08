import styled, { css } from 'styled-components';

import * as HeadingStyles from 'components/Heading/styles';

export const Wrapper = styled.footer`
  ${HeadingStyles.Wrapper} {
    text-transform: uppercase;
  }
`;

export const Copyright = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.xsmall};
    margin-bottom: ${theme.spacings.medium};
    text-align: center;
  `}
`;
