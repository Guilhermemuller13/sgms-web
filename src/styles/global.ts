import {
  createGlobalStyle,
  css,
  DefaultTheme,
  GlobalStyleComponent,
} from "styled-components";

type GlobalStylesProps = {
  removeBG?: boolean;
};

const GlobalStyles: GlobalStyleComponent<
  //@ts-ignore
  GlobalStylesProps,
  DefaultTheme
> = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/poppins-v15-latin-300.eot');
    src: local(''),
        url('/fonts/poppins-v15-latin-300.eot?#iefix') format('embedded-opentype'),
        url('/fonts/poppins-v15-latin-300.woff2') format('woff2'),
        url('/fonts/poppins-v15-latin-300.ttf') format('truetype'),
        url('/fonts/poppins-v15-latin-300.svg#Poppins') format('svg');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/poppins-v15-latin-regular.eot');
    src: local(''),
        url('/fonts/poppins-v15-latin-regular.eot?#iefix') format('embedded-opentype'),
        url('/fonts/poppins-v15-latin-regular.woff2') format('woff2'),
        url('/fonts/poppins-v15-latin-regular.ttf') format('truetype'),
        url('/fonts/poppins-v15-latin-regular.svg#Poppins') format('svg');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/poppins-v15-latin-600.eot');
    src: local(''),
        url('/fonts/poppins-v15-latin-600.eot?#iefix') format('embedded-opentype'),
        url('/fonts/poppins-v15-latin-600.woff2') format('woff2'),
        url('/fonts/poppins-v15-latin-600.ttf') format('truetype'),
        url('/fonts/poppins-v15-latin-600.svg#Poppins') format('svg');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  ${({ theme, removeBG }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      ${!removeBG &&
      css`
        background-color: ${theme.colors.mainBg};
      `}
    }
  `}
`;

export default GlobalStyles;
