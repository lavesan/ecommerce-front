import React, { useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { CheckoutContext } from "@/context/CheckoutContext";
import { IProduct } from "@/models/entities/IProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { useConfigCheckout } from "@/hooks/useConfigCheckout";
import { useConfigApp } from "@/hooks/useConfigApp";
import { AppContext } from "@/context/AppContext";
import { Checkout } from "@/components/Checkout";

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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const checkoutConfig = useConfigCheckout();
  const appConfig = useConfigApp();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <CheckoutContext.Provider value={checkoutConfig}>
          <AppContext.Provider value={appConfig}>
            <Component {...pageProps} />
            <Checkout />
          </AppContext.Provider>
        </CheckoutContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
