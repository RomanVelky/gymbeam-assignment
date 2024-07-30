import { useTheme } from "next-themes";
import Head from "next/head";
import { ReactNode, useEffect } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("system");
    }
  }, [setTheme]);

  return (
    <>
      <Head>
        <title>Todo List App</title>
      </Head>
      <div className={`theme-${resolvedTheme}`} suppressHydrationWarning>
        <Header />
        <main className="max-w-md sm:max-w-2xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-xl mx-auto pt-20 py-14">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
