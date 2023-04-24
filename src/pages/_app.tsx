import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { CheckoutContext } from "@/context/CheckoutContext";
import { useConfigCheckout } from "@/hooks/useConfigCheckout";
import { useConfigApp } from "@/hooks/useConfigApp";
import { AppContext } from "@/context/AppContext";
import { Checkout } from "@/components/Checkout";
import { Loading } from "@/components/Loading";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const checkoutConfig = useConfigCheckout();
  const { isLoading, ...appConfig } = useConfigApp();

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {isLoading && <Loading />}
          <CheckoutContext.Provider value={checkoutConfig}>
            <AppContext.Provider value={appConfig}>
              <Component {...pageProps} />
              <Checkout />
            </AppContext.Provider>
          </CheckoutContext.Provider>
        </ThemeProvider>
      </CacheProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
