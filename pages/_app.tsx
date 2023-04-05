import Head from "next/head";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "../global.css"
import { CacheProvider, EmotionCache } from "@emotion/react";
import { lightTheme, darkTheme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { wrapper } from "store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: AppProps["Component"] & {
    pageLayout?: React.ComponentType | any;
  };
}

function MyApp({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={lightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {Component.pageLayout ? (
            <Component.pageLayout>
              <Component {...pageProps} />
            </Component.pageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
