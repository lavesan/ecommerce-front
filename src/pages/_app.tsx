import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { CheckoutContext } from "@/context/CheckoutContext";
import { useConfigCheckout } from "@/hooks/useConfigCheckout";
import { useConfigApp } from "@/hooks/useConfigApp";
import { AppContext } from "@/context/AppContext";
import { Loading } from "@/components/Loading";
import { AppToast } from "@/components/AppToast";
import { AxiosInterceptorHOC } from "@/config/axios.config";
import { Footer } from "@/components/Footer";
import { SwipeableCart } from "@/components/SwipeableCart";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRouter } from "next/router";
import { BouncingDotsLoader } from "@/components/BouncingDotsLoader";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { isLoading, toast, onToastClose, ...appConfig } = useConfigApp();
  const checkoutConfig = useConfigCheckout(appConfig);

  const materialTheme = useMemo(
    () => theme(appConfig.themeMode),
    [appConfig.themeMode]
  );

  const router = useRouter();

  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoadingPage(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoadingPage(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const [firstLoad, setFirstLoad] = useState(true);

  const hideFirstLoading = () => {
    setFirstLoad(false);
  };

  useEffect(() => {
    window.addEventListener("load", hideFirstLoading);

    return () => {
      window.removeEventListener("load", hideFirstLoading);
    };
  });

  if (firstLoad) return <BouncingDotsLoader isLoading={true} />;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>Marketplace - Restaurantes</title>
            <link
              rel="icon"
              type="image/x-icon"
              href="/static/logo-color.png"
            ></link>
          </Head>
          <ThemeProvider theme={materialTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles
              styles={{
                html: {
                  scrollBehavior: "smooth",
                },
                body: {
                  overflowX: "hiddeh",
                },
                "#__next": {
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            />
            <AppContext.Provider value={appConfig}>
              <CheckoutContext.Provider value={checkoutConfig}>
                <AxiosInterceptorHOC>
                  <>
                    <GoogleOAuthProvider
                      clientId={process.env.NEXT_PUBLIC_GOOGLE_ID || ""}
                    >
                      <BouncingDotsLoader isLoading={loadingPage} />
                      <Loading isLoading={isLoading} />
                      <Component {...pageProps} />
                      <Footer />
                    </GoogleOAuthProvider>
                    <AppToast
                      onClose={onToastClose}
                      isOpen={toast.isOpen}
                      message={toast.message}
                      status={toast.status}
                    />
                    <SwipeableCart
                      isOpen={checkoutConfig.open}
                      onClose={checkoutConfig.closeCheckout}
                      onOpen={checkoutConfig.openCheckout}
                    />
                  </>
                </AxiosInterceptorHOC>
              </CheckoutContext.Provider>
            </AppContext.Provider>
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
