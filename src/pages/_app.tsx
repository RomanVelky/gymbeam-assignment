import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/layout/layout";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
