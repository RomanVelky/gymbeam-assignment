import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useGetList } from "@/hooks/api/useGetLists";
import { Button } from "@/components/ui/button";
import ListManager from "@/components/list-manager";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ListSelector from "@/components/list-selector";

const Home = () => {
  const t = useTranslations();
  const { data, isPending, isError } = useGetList();

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const handleSelect = (listId: number) => {
    console.log("Selected list ID:", listId);
  };

  return (
    <main className="min-h-svh flex flex-col items-center gap-y-8">
      <h1 className="text-center text-7xl">{t("test")}</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Manage Lists</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px] lg:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Manage Lists</DialogTitle>
            <DialogDescription>
              Make changes to your lists here. Click exit when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className=" py-4">
            <div className=" items-center ">
              <ListManager lists={data} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ListSelector onSelect={handleSelect} />
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = (await import(`../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};
