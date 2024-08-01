import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
