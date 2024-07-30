import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main className="min-h-svh">
      <h1 className="text-center text-7xl">{t("test")}</h1>
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
