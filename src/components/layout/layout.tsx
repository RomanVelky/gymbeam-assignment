import { useTheme } from "next-themes";
import Head from "next/head";
import { ReactNode, useEffect, useState, createContext } from "react";
import Header from "./header";

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
        <title>Todo List App</title>
      </Head>
      <div className={`theme-${resolvedTheme}`} suppressHydrationWarning>
        <Header onSelect={setSelectedListId} />
        <main className="max-w-md sm:max-w-2xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-xl mx-auto pt-20 py-14">
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
