import LangButton from "@/components/lang-button";
import ThemeButton from "@/components/theme-button";
import { Button } from "@/components/ui/button";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main className="min-h-svh">
      <h1 className="text-center text-7xl">{t("test")}</h1>
      <Button>Normal button </Button>
      <ThemeButton />
      <LangButton />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = (await import(`../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};
