import styled, { css } from "styled-components";
import { darken } from "polished";

import * as TextFieldStyles from "components/TextField/styles";
import * as TextAreaFieldStyles from "components/TextAreaField/styles";
import * as FileFieldStyles from "components/FileField/styles";
import * as ButtonStyles from "components/Button/styles";

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    /* padding: ${theme.spacings.xxsmall}; */
    ${TextFieldStyles.Wrapper} {
      padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall};
    }

    ${TextAreaFieldStyles.Wrapper} {
      padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall};
    }

    ${ButtonStyles.Wrapper} {
      padding: ${theme.spacings.medium} auto ${theme.spacings.xsmall};
    }
  `}
`;

export const FormLink = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    text-align: center;

    a {
      color: ${theme.colors.secondary};
      text-decoration: none;
      border-bottom: 0.1rem solid ${theme.colors.secondary};
      transition: color, border, ${theme.transition.fast};

      &:hover {
        color: ${darken(0.1, theme.colors.secondary)};
        border-bottom: 0.1rem solid ${darken(0.1, theme.colors.secondary)};
      }
    }
  `}
`;

export const FormError = styled.div`
  ${({ theme }) => css`
    text-align: center;
    color: red;
    font-size: ${theme.font.sizes.small};

    svg {
      width: 1.6rem;
    }
  `}
`;
