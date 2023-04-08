import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import NextProgress from 'nextjs-progressbar';

import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Sistema de gerenciamento de oficinas</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Sistem de gestão para oficinas de motocicletas"
        />
      </Head>
      <GlobalStyles />
      <NextProgress
        color="#ffffff"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
