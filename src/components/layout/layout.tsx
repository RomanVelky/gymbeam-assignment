import { useTheme } from "next-themes";
import Head from "next/head";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import Header from "./header";
import { useTranslations } from "next-intl";

type LayoutProps = {
  children: ReactNode;
};

interface LayoutContextProps {
  selectedListId: number | null;
  setSelectedListId: (id: number | null) => void;
}

export const LayoutContext = createContext<LayoutContextProps>({
  selectedListId: null,
  setSelectedListId: () => {},
});

const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const t = useTranslations();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("system");
    }
  }, [setTheme]);

  return (
    <LayoutContext.Provider value={{ selectedListId, setSelectedListId }}>
      <Head>
        <title>{t("global.title")}</title>
      </Head>
      <div className={`theme-${resolvedTheme}`} suppressHydrationWarning>
        <Header />
        <main className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-xl mx-auto pt-20 py-14">
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
