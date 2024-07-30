import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/theme-button";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <h1 className="text-9xl text-center">
        PLACEHOLDER PLACEHOLDER PLACEHOLDER
      </h1>
      <Button>Normal button </Button>
      <ThemeButton />
    </main>
  );
}
