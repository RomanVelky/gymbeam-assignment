import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  {
    code: "en",
    label: "English",
    flagSrc:
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
  },
  {
    code: "sk",
    label: "Slovak",
    flagSrc:
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/SK.svg",
  },
];

const LangButton = () => {
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="w-6 h-6" />
          <span className="sr-only">Choose Language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map(({ code, label, flagSrc }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}>
            <div className="flex gap-2">
              <img className="w-6 h-5" alt="country flag" src={flagSrc} />
              {label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangButton;
